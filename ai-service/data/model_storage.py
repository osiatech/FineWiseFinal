# data/model_storage.py

import joblib
import os
import json
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, Any, Optional
import logging

class ModelStorage:
    def __init__(self, storage_dir: str = "data/model_storage"):
        self.storage_dir = storage_dir
        self.models_dir = os.path.join(storage_dir, "models")
        self.metadata_dir = os.path.join(storage_dir, "metadata")
        self.backups_dir = os.path.join(storage_dir, "backups")
        
        # Crear directorios si no existen
        self._ensure_directories()
        
        # Cache en memoria para modelos frecuentemente usados
        self.model_cache = {}
        self.cache_limit = 10  # Máximo 10 modelos en cache
    
    def _ensure_directories(self):
        """Crea los directorios necesarios para almacenamiento"""
        directories = [self.storage_dir, self.models_dir, self.metadata_dir, self.backups_dir]
        
        for directory in directories:
            if not os.path.exists(directory):
                os.makedirs(directory)
                logging.info(f"Directorio creado: {directory}")
    
    def save_user_models(self, user_id: str, models: Dict[str, Any], 
                        scalers: Dict[str, Any], metadata: Dict[str, Any] = None) -> bool:
        """
        Guarda los modelos y scalers de un usuario específico
        """
        try:
            # Crear backup del modelo anterior si existe
            self._backup_existing_model(user_id)
            
            # Preparar datos para guardar
            model_data = {
                "models": models,
                "scalers": scalers,
                "user_id": user_id,
                "saved_at": datetime.now().isoformat(),
                "version": "1.0"
            }
            
            # Guardar modelo
            model_path = os.path.join(self.models_dir, f"{user_id}_model.pkl")
            joblib.dump(model_data, model_path)
            
            # Guardar metadata
            if metadata:
                metadata_enhanced = {
                    **metadata,
                    "user_id": user_id,
                    "model_path": model_path,
                    "saved_at": datetime.now().isoformat(),
                    "model_size_kb": round(os.path.getsize(model_path) / 1024, 2),
                    "categories_trained": list(set([key.split('_')[1] for key in models.keys() if '_' in key]))
                }
                
                metadata_path = os.path.join(self.metadata_dir, f"{user_id}_metadata.json")
                with open(metadata_path, 'w') as f:
                    json.dump(metadata_enhanced, f, indent=2)
            
            # Actualizar cache
            self._update_cache(user_id, model_data)
            
            logging.info(f"Modelo guardado exitosamente para usuario {user_id}")
            return True
            
        except Exception as e:
            logging.error(f"Error guardando modelo para {user_id}: {e}")
            return False
    
    def load_user_models(self, user_id: str) -> Optional[Dict[str, Any]]:
        """
        Carga los modelos y scalers de un usuario específico
        """
        try:
            # Verificar cache primero
            if user_id in self.model_cache:
                logging.info(f"Modelo cargado desde cache para {user_id}")
                return self.model_cache[user_id]
            
            # Cargar desde archivo
            model_path = os.path.join(self.models_dir, f"{user_id}_model.pkl")
            
            if not os.path.exists(model_path):
                logging.warning(f"No se encontró modelo para usuario {user_id}")
                return None
            
            model_data = joblib.load(model_path)
            
            # Validar estructura del modelo
            if not self._validate_model_structure(model_data):
                logging.error(f"Estructura de modelo inválida para {user_id}")
                return None
            
            # Actualizar cache
            self._update_cache(user_id, model_data)
            
            logging.info(f"Modelo cargado exitosamente para usuario {user_id}")
            return model_data
            
        except Exception as e:
            logging.error(f"Error cargando modelo para {user_id}: {e}")
            return None
    
    def get_user_metadata(self, user_id: str) -> Optional[Dict[str, Any]]:
        """
        Obtiene la metadata de los modelos de un usuario
        """
        try:
            metadata_path = os.path.join(self.metadata_dir, f"{user_id}_metadata.json")
            
            if not os.path.exists(metadata_path):
                return None
            
            with open(metadata_path, 'r') as f:
                metadata = json.load(f)
            
            return metadata
            
        except Exception as e:
            logging.error(f"Error cargando metadata para {user_id}: {e}")
            return None
    
    def delete_user_models(self, user_id: str) -> bool:
        """
        Elimina todos los modelos y metadata de un usuario
        """
        try:
            # Crear backup antes de eliminar
            self._backup_existing_model(user_id)
            
            # Eliminar archivos
            model_path = os.path.join(self.models_dir, f"{user_id}_model.pkl")
            metadata_path = os.path.join(self.metadata_dir, f"{user_id}_metadata.json")
            
            files_deleted = 0
            
            if os.path.exists(model_path):
                os.remove(model_path)
                files_deleted += 1
            
            if os.path.exists(metadata_path):
                os.remove(metadata_path)
                files_deleted += 1
            
            # Remover del cache
            if user_id in self.model_cache:
                del self.model_cache[user_id]
            
            logging.info(f"Eliminados {files_deleted} archivos para usuario {user_id}")
            return files_deleted > 0
            
        except Exception as e:
            logging.error(f"Error eliminando modelos para {user_id}: {e}")
            return False
    
    def list_user_models(self) -> List[Dict[str, Any]]:
        """
        Lista todos los modelos de usuarios almacenados
        """
        try:
            users_info = []
            
            for filename in os.listdir(self.models_dir):
                if filename.endswith('_model.pkl'):
                    user_id = filename.replace('_model.pkl', '')
                    
                    # Obtener información básica del archivo
                    model_path = os.path.join(self.models_dir, filename)
                    file_stats = os.stat(model_path)
                    
                    # Obtener metadata si existe
                    metadata = self.get_user_metadata(user_id)
                    
                    user_info = {
                        "user_id": user_id,
                        "model_size_kb": round(file_stats.st_size / 1024, 2),
                        "last_modified": datetime.fromtimestamp(file_stats.st_mtime).isoformat(),
                        "has_metadata": metadata is not None,
                        "categories_trained": metadata.get("categories_trained", []) if metadata else []
                    }
                    
                    users_info.append(user_info)
            
            return users_info
            
        except Exception as e:
            logging.error(f"Error listando modelos: {e}")
            return []
    
    def cleanup_old_models(self, days_old: int = 30) -> int:
        """
        Limpia modelos antiguos que no se han usado en X días
        """
        try:
            cutoff_date = datetime.now() - timedelta(days=days_old)
            cleaned_count = 0
            
            for filename in os.listdir(self.models_dir):
                if filename.endswith('_model.pkl'):
                    model_path = os.path.join(self.models_dir, filename)
                    file_modified = datetime.fromtimestamp(os.path.getmtime(model_path))
                    
                    if file_modified < cutoff_date:
                        user_id = filename.replace('_model.pkl', '')
                        
                        # Crear backup antes de eliminar
                        self._backup_existing_model(user_id)
                        
                        # Eliminar archivos
                        if self.delete_user_models(user_id):
                            cleaned_count += 1
                            logging.info(f"Modelo antiguo eliminado: {user_id}")
            
            logging.info(f"Limpieza completada: {cleaned_count} modelos eliminados")
            return cleaned_count
            
        except Exception as e:
            logging.error(f"Error en limpieza de modelos: {e}")
            return 0
    
    def get_storage_stats(self) -> Dict[str, Any]:
        """
        Obtiene estadísticas del almacenamiento de modelos
        """
        try:
            total_models = len([f for f in os.listdir(self.models_dir) if f.endswith('_model.pkl')])
            total_metadata = len([f for f in os.listdir(self.metadata_dir) if f.endswith('_metadata.json')])
            
            # Calcular tamaño total
            total_size = 0
            for root, dirs, files in os.walk(self.storage_dir):
                for file in files:
                    total_size += os.path.getsize(os.path.join(root, file))
            
            return {
                "total_models": total_models,
                "total_metadata_files": total_metadata,
                "total_size_mb": round(total_size / (1024 * 1024), 2),
                "cache_size": len(self.model_cache),
                "storage_directory": self.storage_dir,
                "last_updated": datetime.now().isoformat()
            }
            
        except Exception as e:
            logging.error(f"Error obteniendo estadísticas: {e}")
            return {}
    
    def _backup_existing_model(self, user_id: str):
        """
        Crea backup del modelo existente antes de sobrescribir
        """
        try:
            model_path = os.path.join(self.models_dir, f"{user_id}_model.pkl")
            
            if os.path.exists(model_path):
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                backup_filename = f"{user_id}_model_backup_{timestamp}.pkl"
                backup_path = os.path.join(self.backups_dir, backup_filename)
                
                # Copiar archivo
                import shutil
                shutil.copy2(model_path, backup_path)
                
                logging.info(f"Backup creado: {backup_filename}")
                
                # Limpiar backups antiguos (mantener solo los últimos 5)
                self._cleanup_old_backups(user_id)
                
        except Exception as e:
            logging.error(f"Error creando backup para {user_id}: {e}")
    
    def _cleanup_old_backups(self, user_id: str, keep_count: int = 5):
        """
        Mantiene solo los últimos N backups por usuario
        """
        try:
            # Listar backups del usuario
            user_backups = []
            for filename in os.listdir(self.backups_dir):
                if filename.startswith(f"{user_id}_model_backup_"):
                    backup_path = os.path.join(self.backups_dir, filename)
                    modified_time = os.path.getmtime(backup_path)
                    user_backups.append((filename, modified_time))
            
            # Ordenar por fecha de modificación (más reciente primero)
            user_backups.sort(key=lambda x: x[1], reverse=True)
            
            # Eliminar backups antiguos
            for filename, _ in user_backups[keep_count:]:
                backup_path = os.path.join(self.backups_dir, filename)
                os.remove(backup_path)
                logging.info(f"Backup antiguo eliminado: {filename}")
                
        except Exception as e:
            logging.error(f"Error limpiando backups para {user_id}: {e}")
    
    def _validate_model_structure(self, model_data: Dict[str, Any]) -> bool:
        """
        Valida que la estructura del modelo sea correcta
        """
        try:
            required_keys = ["models", "scalers", "user_id", "saved_at"]
            
            for key in required_keys:
                if key not in model_data:
                    logging.error(f"Clave faltante en modelo: {key}")
                    return False
            
            # Validar que models y scalers sean diccionarios
            if not isinstance(model_data["models"], dict):
                logging.error("El campo 'models' debe ser un diccionario")
                return False
            
            if not isinstance(model_data["scalers"], dict):
                logging.error("El campo 'scalers' debe ser un diccionario")
                return False
            
            return True
            
        except Exception as e:
            logging.error(f"Error validando estructura del modelo: {e}")
            return False
    
    def _update_cache(self, user_id: str, model_data: Dict[str, Any]):
        """
        Actualiza el cache de modelos en memoria
        """
        try:
            # Si el cache está lleno, eliminar el modelo menos usado (FIFO)
            if len(self.model_cache) >= self.cache_limit:
                oldest_user = next(iter(self.model_cache))
                del self.model_cache[oldest_user]
                logging.info(f"Modelo eliminado del cache: {oldest_user}")
            
            # Agregar al cache
            self.model_cache[user_id] = model_data
            logging.info(f"Modelo agregado al cache: {user_id}")
            
        except Exception as e:
            logging.error(f"Error actualizando cache: {e}")
    
    def export_user_model(self, user_id: str, export_path: str) -> bool:
        """
        Exporta el modelo de un usuario a una ubicación específica
        """
        try:
            model_data = self.load_user_models(user_id)
            
            if not model_data:
                logging.error(f"No se encontró modelo para exportar: {user_id}")
                return False
            
            # Agregar información de exportación
            export_data = {
                **model_data,
                "export_date": datetime.now().isoformat(),
                "export_version": "1.0"
            }
            
            joblib.dump(export_data, export_path)
            logging.info(f"Modelo exportado exitosamente a: {export_path}")
            return True
            
        except Exception as e:
            logging.error(f"Error exportando modelo: {e}")
            return False
    
    def import_user_model(self, user_id: str, import_path: str) -> bool:
        """
        Importa un modelo desde una ubicación específica
        """
        try:
            if not os.path.exists(import_path):
                logging.error(f"Archivo de importación no encontrado: {import_path}")
                return False
            
            # Cargar datos
            model_data = joblib.load(import_path)
            
            # Validar estructura
            if not self._validate_model_structure(model_data):
                logging.error("Estructura de modelo importado inválida")
                return False
            
            # Actualizar user_id y fecha
            model_data["user_id"] = user_id
            model_data["imported_at"] = datetime.now().isoformat()
            
            # Guardar como modelo regular
            return self.save_user_models(
                user_id, 
                model_data["models"], 
                model_data["scalers"],
                {"imported_from": import_path}
            )
            
        except Exception as e:
            logging.error(f"Error importando modelo: {e}")
            return False
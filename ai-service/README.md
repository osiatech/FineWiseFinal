# 🐍 Python Project Setup Guide

Este proyecto requiere Python 3.8 o superior. Sigue los pasos correspondientes a tu sistema operativo para configurar el entorno virtual, instalar dependencias y ejecutar el archivo principal `main.py`.

---

## 📦 Requisitos previos

- Tener **Python 3.8+** instalado
- Tener `pip` (ya viene con Python)
- Tener acceso a una terminal (Command Prompt, PowerShell, Terminal, etc.)

---

## ⚙️ 1. Crear entorno virtual

### ✅ Windows (CMD o PowerShell)

```bash
python -m venv venv
````

### ✅ macOS / Linux

```bash
python3 -m venv venv
```

---

## 🚀 2. Activar el entorno virtual

### ✅ Windows (CMD)

```cmd
venv\Scripts\activate
```

### ✅ Windows (PowerShell)

```powershell
venv\Scripts\Activate.ps1
```

> 💡 Si obtienes un error de ejecución, ejecuta:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### ✅ macOS / Linux

```bash
source venv/bin/activate
```

---

## 📥 3. Instalar dependencias

Una vez activado el entorno virtual, instala los paquetes requeridos:

```bash
pip install -r requirements.txt
```

---

## ▶️ 4. Ejecutar la aplicación

Después de instalar las dependencias, ejecuta el archivo principal:

```bash
python main.py
```

O en macOS/Linux si usas `python3`:

```bash
python3 main.py
```

---

## 🧪 Verificar que funciona

Si todo está correcto, deberías ver la salida de tu programa en consola.

---

## 🧹 Cómo desactivar el entorno virtual

Cuando termines, puedes salir del entorno virtual con:

```bash
deactivate
```

---

## 📝 Notas adicionales

* Asegúrate de no subir la carpeta `venv/` a Git. Está listada en `.gitignore`.
* Puedes regenerar `requirements.txt` con:

```bash
pip freeze > requirements.txt
```
import { Menu } from "@/src/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Inicio",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Acerca de nosotros",
    path: "/about",
    newTab: false,
  },
  {
    id: 33,
    title: "Articulos",
    path: "/blog",
    newTab: false,
  },
  {
    id: 3,
    title: "Ayuda",
    path: "/contact",
    newTab: false,
  },
  {
    id: 4,
    title: "Menu",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Acerca de nosotros",
        path: "/about",
        newTab: false,
      },
      {
        id: 42,
        title: "Contacto",
        path: "/contact",
        newTab: false,
      },
      {
        id: 43,
        title: "Articulo 1",
        path: "/blog",
        newTab: false,
      },
      {
        id: 44,
        title: "Articulo 2",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 45,
        title: "Articulo 3",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 46,
        title: "Iniciar Sesion",
        path: "/signin",
        newTab: false,
      },
      {
        id: 47,
        title: "Registrarse",
        path: "/signup",
        newTab: false,
      },
      {
        id: 48,
        title: "Pagina de Error",
        path: "/error",
        newTab: false,
      },
    ],
  },
];
export default menuData;

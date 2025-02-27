# 📰 Proyecto: Noticias GG 2

Este proyecto es una aplicación de noticias desarrollada con **React Native** y **Expo**. Permite a los usuarios acceder a noticias actualizadas de diferentes categorías y fuentes, usando la **API NewsData.io**.

## 📱 Características

### **Búsqueda de noticias**
Ingresa el nombre de una categoría o tema para obtener las noticias relacionadas.

### **Visualización de noticias**
Muestra una lista de noticias, incluyendo:
- 📰 Título de la noticia
- 📅 Fecha de publicación
- 📰 Descripción
- 🌐 Fuente de la noticia

### **Filtros por categorías**
Permite filtrar las noticias por categorías como:
- **Negocios**
- **Entretenimiento**
- **Tecnología**
- **Deportes**
- **Ciencia**
- **General**

### **Interfaz intuitiva**
Diseño fácil de usar y estéticamente atractivo, creado con **Tailwind CSS**.

## 📱 Plataformas Compatibles

- **Android:** Accede a la aplicación desde cualquier dispositivo Android.  
  [Apk Demo (.apk)](https://github.com/felipesanchez-dev/app-noticias/blob/main/apk/NoticiasGG.apk?raw=true)

- **iOS:** La aplicación es compatible con dispositivos Apple (iPhone, iPad).

## 📂 Estructura del Proyecto

```bash
root/
├── apk/
│   └── NoticiasGG.apk 
├── app/
│   ├── index.tsx
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── discover.tsx
│   │   ├── index.tsx
│   │   ├── saved.tsx
│   │   ├── settings.tsx
│   │   └── _layout.tsx
│   └── news/
│       ├── search.tsx
│       └── [id].tsx
├── assets/
│   ├── fonts/
│   │   └── SpaceMono-Regular.ttf
│   └── images/
│       ├── avatar.png
│       ├── favicon.png
│       └── welcome.jpg
├── components/
│   ├── BreakingNews.tsx
│   ├── Categories.tsx
│   ├── CheckBox.tsx
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── NewsList.tsx
│   ├── Pagination.tsx
│   ├── SearchBar.tsx
│   ├── SliderItem.tsx
│   ├── TabBar.tsx
│   └── TabBarButton.tsx
├── constants/
│   ├── Categories.ts
│   ├── Colors.ts
│   ├── CountryList.ts
│   └── Icons.tsx
├── context/
│   └── ThemeContext.tsx
├── dist/
│   ├── assetmap.json
│   ├── debug.html
│   └── metadata.json
├── hooks/
│   ├── useNewsCategories.ts
│   └── useNewsCountry.ts
└── types/
    └── index.ts
```
## ⚙️ Tecnologías Utilizadas
- **React Native** (v0.76): Desarrollo móvil multiplataforma.
- **Expo**: Framework para construir aplicaciones con facilidad.
- **Axios**: Manejo de peticiones HTTP a la API de clima.
- **React Navigation**: Navegación fluida entre pantallas.
## 🌐 API Usada
Este proyecto utiliza la **NewSData.IO** para obtener información del clima. [Visita NewSData.IO aquí](https://newsdata.io/) para más información.

## 📌 Próximos Pasos
Mejorar la accesibilidad de la aplicación.
Implementar más detalles sobre el pronóstico extendido.
Optimizar el manejo de errores en las llamadas a la API.

# 📄 Licencia
Este proyecto está bajo la Licencia MIT. Siéntete libre de usarlo y modificarlo. 😊

## **💬 Conéctate conmigo**  

Si tienes preguntas, ideas o simplemente quieres compartir tu experiencia desarrollando proyectos similares, ¡no dudes en contactarme! 😊  

**Correo:** [jfelipe9.121@gmail.com](mailto:jfelipe9.121@gmail.com)  
**LinkedIn:** [felipereyessa](https://www.linkedin.com/in/felipereyessa)  
**Sitio Web:** [Mi portafolio](https://pipedev.vercel.app/)  

--- 
**⚠️ Nota importante:** Este es un proyecto es parte del reto **Reto: Proyectos con APIs 🚀:** [[Link del repositorio]](https://github.com/felipesanchez-dev/RN-15-Projects-APIs-Challenge), por lo que **no se aceptarán contribuciones externas** (pull requests o commits).  

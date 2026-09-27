# Portfolio · Miguel Ángel Díaz

Portfolio personal publicado en **https://miguelangeldiaztic.github.io**.

React 19 + TypeScript + Vite, CSS propio (sin librerías de UI), tema claro/oscuro y versión en español e inglés.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # comprobación de tipos + build en dist/
npm run lint
```

## Despliegue

Cada push a `master` lanza `.github/workflows/deploy.yml`, que compila y publica en GitHub Pages.

Solo hay que configurarlo una vez: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Añadir un proyecto

1. Abre `src/data/projects.ts` y copia uno de los objetos.
2. Cambia `slug`, `title`, `description` (`es` y `en`), `tags`, `repo`, `demo` y `date` (`"AAAA-MM"`; se ordenan del más nuevo al más antiguo).
3. Guarda una captura en `public/projects/<slug>.webp` (unos 1280×800) y pon `image: '/projects/<slug>.webp'`. Si no hay captura, la tarjeta muestra el título.
   Si es una app de móvil, usa `screens: ['/projects/a.webp', '/projects/b.webp', '/projects/c.webp']` con capturas de 390×844: se muestran como teléfonos.
4. `featured: true` hace que la tarjeta ocupe dos columnas.
5. Haz commit y push: la web se actualiza sola.

## Otros datos

| Qué | Dónde |
|---|---|
| Nombre, bio, redes, foto | `src/data/profile.ts` (foto en `public/`, p. ej. `photo: '/me.jpg'`) |
| Experiencia | `src/data/experience.ts` |
| Formación | `src/data/education.ts` |
| Competencias | `src/data/skills.ts` |
| Textos de la interfaz | `src/i18n/strings.ts` |
| CV en PDF | `public/cv/CV_Miguel_Angel_Diaz.pdf` |
| Colores y estilos | `src/index.css` (variables al principio) |

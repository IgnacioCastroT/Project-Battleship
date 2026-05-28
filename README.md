# ⚓ Battleship Moderno

¡Bienvenido a **Project-Battleship**! Una reinterpretación moderna y elegante del clásico juego de mesa "Batalla Naval". Este proyecto cuenta con una interfaz de usuario completamente renovada, animaciones inmersivas y un diseño *glassmorphism* táctico.

![Battleship Game](https://img.shields.io/badge/Status-Completado-success)
![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Webpack](https://img.shields.io/badge/Webpack-5.0-8DD6F9?logo=webpack&logoColor=black)

👉 **[¡Juega ahora en vivo!](https://IgnacioCastroT.github.io/Project-Battleship/)**

## 🌟 Características Destacadas

- **Diseño Premium**: Interfaz moderna con efectos de cristal (*glassmorphism*), una paleta de colores oscuro/neón y fuentes actualizadas (Google Fonts "Outfit").
- **Animaciones Reactivas**: Efectos visuales de radar, micro-animaciones al apuntar y efectos explosivos (calaveras animadas) al acertar y hundir barcos.
- **Diseño Responsivo**: Adaptable a dispositivos móviles y pantallas de escritorio.
- **Lógica Robusta**: Construido en Vanilla JavaScript puro, separando el estado del juego (basado en testing) de la capa gráfica (UI).

## 🚀 Cómo Jugar

1. **Posiciona tu Flota**: Haz clic en el radar izquierdo para colocar tus 5 barcos. Puedes rotarlos horizontal o verticalmente usando el botón correspondiente, o si tienes prisa, usa el botón **Colocar aleatoriamente**.
2. **Ataca al Enemigo**: Una vez colocados todos tus barcos, el tablero enemigo aparecerá a la derecha. Haz clic en las coordenadas que creas que esconden un barco rival.
   - 💣 **Impacto (Hit)**: Celda roja resplandeciente.
   - ☠️ **Hundido (Sunk)**: El barco enemigo es destruido por completo con una animación espectacular.
   - • **Fallo (Miss)**: Agua vacía.
3. **¡Gana la partida!**: El primer jugador en hundir la flota completa del adversario, gana.

## 🛠️ Tecnologías Usadas

- **HTML5 & CSS3** (Variables CSS, Flexbox/Grid, Animaciones Keyframes)
- **JavaScript (ES6+)**
- **Webpack & Babel** para empaquetamiento y transpilación.
- **Jest** para testing unitario.

## 💻 Instalación Local

Si quieres descargar el proyecto, editarlo o correrlo en tu máquina:

```bash
# Clona el repositorio
git clone https://github.com/IgnacioCastroT/Project-Battleship.git

# Entra al directorio
cd Project-Battleship

# Instala las dependencias
npm install

# Levanta el servidor de desarrollo local
npm run start
```

Para generar la versión de producción minificada y optimizada:
```bash
npm run build
```

## 🤝 Créditos

Creado por [Ignacio Castro](https://github.com/IgnacioCastroT).

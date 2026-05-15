# 🏨 Sistema de Gestión Hotelera — Frontend (React)

Esta es la **"Cara visual"** del sistema de la prueba tecnica para el registro y configuración de hoteles de **Hoteles Decameron**. Es la parte que tú ves y con la que interactúas: formularios, listados, botones y notificaciones.

> 💡 **¿Qué es esto?** Si el Backend es el motor del carro, este es la carrocería, el tablero y el volante — la parte que el conductor (tú) ve y usa.

---

## 🌐 Acceso Rápido (Sin instalar nada)

¿Solo quieres ver cómo se ve? ¡Entra directamente desde tu navegador!

| ¿Qué es? | Enlace |
|---|---|
| 🖥️ **La app en producción** | [Vercel App](https://decameron-front-end-git-master-ddd10232001-5798s-projects.vercel.app/) |
| 🐘 **El Backend (cerebro)** | [GitHub - decameron-Backend](https://github.com/dnavac/decameron-Backend) |
---

## 💡 ¿Qué hace esta parte visual?

- ✅ Muestra el listado de hoteles registrados.
- ✅ Permite registrar nuevos hoteles con sus datos básicos.
- ✅ Permite asignar tipos de habitación y acomodación a cada hotel.
- ✅ Los selectores son **inteligentes**: si eliges el tipo "Estándar", automáticamente solo te mostrará "Sencilla" o "Doble" como acomodación. ¡Así es imposible equivocarse!
- ✅ Muestra notificaciones cuando algo sale bien o cuando hay un error.
- ✅ Funciona perfectamente en portátiles de 13" y 15".

---

## 🛠️ Tecnologías usadas (Para los curiosos 🤓)

| Tecnología | ¿Para qué sirve? |
|---|---|
| **React + Vite** | Construye la interfaz visual rápidamente |
| **Tailwind CSS** | Le da el diseño y los colores a todo |
| **React Router DOM** | Permite navegar entre páginas sin recargar |
| **React Hot Toast** | Muestra los mensajes de éxito o error |
| **Axios** | Se comunica con el Backend para guardar y traer datos |

---

---

# 👵 Guía de Instalación Paso a Paso

> ¡Hola de nuevo! Poner en marcha esta parte visual es incluso más fácil que el Backend. ☕  
> Recuerda: si ya tienes el Backend corriendo, ¡ya hiciste lo más difícil!

---

## 🧰 PASO 0 — Instalar los programas necesarios

Para este proyecto solo necesitas **2 programas**. Si ya los tienes instalados del Backend, ¡sáltate a la que corresponda!

---

### 📌 Programa 1: Node.js versión 18 o superior (El motor de la aplicación)

Node.js es el programa que le permite a tu computador ejecutar aplicaciones hechas en React.

**¿Cómo instalarlo?**

1. Entra a: 👉 [https://nodejs.org/](https://nodejs.org/)
2. Verás dos botones grandes. Descarga el que dice **"LTS"** (es la versión más estable).
3. Ejecuta el instalador descargado y sigue los pasos (siguiente, siguiente, finalizar). Puedes dejar todas las opciones por defecto.

4. **Verifica que quedó bien instalado:**  
   Abre la ventana negra (ver cómo más abajo 👇) y escribe:
   ```
   node -v
   ```
   Si ves algo como `v18.x.x` o superior — ¡perfecto! ✅

   Luego verifica también que npm quedó instalado:
   ```
   npm -v
   ```
   Si ves algo como `9.x.x` — ¡perfecto! ✅

---

### 📌 Programa 2: Git (Para descargar el proyecto desde internet)

Si ya instalaste Git al configurar el Backend, ¡sáltate este paso!

1. Entra a: 👉 [https://git-scm.com/downloads](https://git-scm.com/downloads)
2. Descarga el instalador para tu sistema operativo y ejecútalo (siguiente, siguiente, finalizar).

3. **Verifica que quedó bien instalado:**
   ```
   git --version
   ```
   Si ves algo como `git version 2.x.x` — ¡perfecto! ✅

---

### 💻 ¿Cómo abro la "ventana negra"?

- **En Windows:** Presiona `Windows + R`, escribe `cmd` y presiona Enter. O busca **"PowerShell"** en el menú inicio.
- **En Mac:** Presiona `Command + Espacio`, escribe `Terminal` y presiona Enter.
- **En Linux:** Presiona `Ctrl + Alt + T`.

> 💡 **Consejo:** Después de instalar cada programa, **cierra y vuelve a abrir la ventana negra** para que el computador los reconozca.

---

## 📥 PASO 1 — Descargar el proyecto

Abre la ventana negra y escribe estos comandos **uno por uno**, presionando Enter después de cada uno:

```bash
git clone https://github.com/dnavac/decameron-FrontEnd.git
```
> 🖥️ Esto descarga el proyecto y crea la carpeta `decameron-FrontEnd` en donde estés parado.

```bash
cd decameron-FrontEnd
```
> 📂 Esto te "mete" dentro de la carpeta del proyecto.

```bash
npm install
```
> ☕ Esto descarga todas las piezas visuales necesarias. **Puede tardar entre 1 y 3 minutos.** Es normal ver muchas letras pasar. ¡Ten un poco de paciencia, como cuando esperas que enfríe el café!

Cuando termine, el cursor volverá a aparecer sin errores. ✅

---
## ⚙️ PASO 2 — Conectar la parte visual con el cerebro (Backend)
 
Ahora hay que decirle a la interfaz visual **dónde está el Backend** para que pueda traer y guardar los datos.
 
**1.** Crea un archivo llamado `.env` en la carpeta del proyecto.
 
En la ventana negra, escribe:
 
- Si tienes **Windows**:
  ```bash
  copy NUL .env
  ```
- Si tienes **Mac o Linux**:
  ```bash
  touch .env
  ```
 
**2.** Abre el archivo `.env` con el Bloc de Notas (u otro editor de texto):
 
- **Windows:** `notepad .env`
- **Mac:** `open -e .env`
- **Linux:** `nano .env`
**3.** Escoge **una** de las siguientes opciones según tu caso y pégala dentro del archivo:
 
---
 
### ☁️ Opción A — Conectar a la nube (RECOMENDADA)
 
Usa esta opción si **no tienes el Backend instalado** en tu computador o no tienes internet de sobra. Es la más fácil.
 
```dotenv
VITE_API_URL=https://decameron-backend-test.laravel.cloud/api
```
 
---
 
### 🏠 Opción B — Conectar al Backend local
 
Usa esta opción si ya tienes el Backend corriendo en tu computador (en otra ventana negra) según la guía del [README del Backend](https://github.com/dnavac/decameron-Backend).
 
```dotenv
VITE_API_URL=http://localhost:8000/api
```
 
> ⚠️ **Importante:** Si usas la Opción B, asegúrate de que el Backend esté encendido **antes** de abrir la aplicación en el navegador. Si no, no aparecerán los datos.
 
---
 
**4.** Guarda el archivo:
- **Windows/Linux:** Presiona `Ctrl + S`
- **Mac:** Presiona `Command + S`
---
 
## 🚀 PASO 3 — ¡Encender la interfaz!
 
Solo falta un comando. Escríbelo en la ventana negra:
 
```bash
npm run dev
```
 
Si todo salió bien, verás algo así en la pantalla:
 
```
  VITE v8.x.x  ready in xxx ms
 
  ➜  Local:   http://localhost:5173/
```
 
🎉 **¡Listo! La interfaz está encendida.**
 
Abre tu navegador (Chrome o Firefox) y entra a:  
👉 **[http://localhost:5173](http://localhost:5173)**
 
> ⚠️ **Importante:** Deja la ventana negra abierta y funcionando. Si la cierras, la aplicación se apagará.
 
---
 
## ❓ Preguntas Frecuentes
 
**¿Qué hago si veo `npm: command not found`?**  
→ Node.js no quedó bien instalado. Cierra y vuelve a abrir la ventana negra. Si sigue fallando, reinstala Node.js desde el Paso 0.
 
**¿La página carga pero no aparecen datos?**  
→ Verifica que el archivo `.env` tenga la URL correcta. Ábrelo de nuevo con el Bloc de Notas y revisa que no tenga espacios extra ni errores.
 
**¿Aparece un error que dice "Network Error" o "Failed to fetch"?**  
→ Si elegiste la Opción B (Backend local), asegúrate de que el Backend esté corriendo en otra ventana negra. Si elegiste la Opción A, verifica que tengas conexión a internet.
 
**¿El puerto 5173 está ocupado?**  
→ No te preocupes, Vite asignará otro puerto automáticamente. Mira el mensaje en la ventana negra — te dirá exactamente a qué dirección entrar.
 
**¿La aplicación se apagó sola?**  
→ Posiblemente cerraste la ventana negra por accidente. Vuelve a abrirla, entra a la carpeta con `cd decameron-FrontEnd` y ejecuta `npm run dev` de nuevo.
 
---
 
## 🐘 ¿Y el Backend?
 
Esta interfaz solo es la parte visual. Para que funcione completamente necesita el Backend corriendo. Encuéntralo aquí:
 
👉 **[https://github.com/dnavac/decameron-Backend](https://github.com/dnavac/decameron-Backend)**
 
---
 
## 👨‍💻 Autor
 
Desarrollado por **Diego Navarro** como prueba técnica para **ITBF(IT BUSINESS & FINANCES COLOMBIA)**.

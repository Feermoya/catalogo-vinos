# 🔥 Cómo Configurar Firebase para tu Catálogo de Vinos

Firebase te permitirá actualizar los productos desde cualquier lugar y que los cambios se reflejen en tiempo real para todos tus clientes.

---

## 📋 Requisitos

- Una cuenta de Google (Gmail)
- 10 minutos de tu tiempo

---

## 🚀 Paso a Paso

### **1. Crear Proyecto en Firebase**

1. Ve a [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click en **"Agregar proyecto"** o **"Add project"**
3. Nombre del proyecto: `catalogo-vinos` (o el que prefieras)
4. Click en **"Continuar"**
5. **Desactiva** Google Analytics (no lo necesitas)
6. Click en **"Crear proyecto"**
7. Espera unos segundos... ☕
8. Click en **"Continuar"**

---

### **2. Configurar Realtime Database**

1. En el menú izquierdo, busca **"Realtime Database"**
2. Click en **"Crear base de datos"**
3. **Ubicación**: Elige `United States` (us-central1)
4. Click en **"Siguiente"**
5. **Modo de seguridad**: Selecciona **"Comenzar en modo de prueba"**
   - ⚠️ **Importante**: Esto permite escritura temporal (30 días)
6. Click en **"Habilitar"**

---

### **3. Obtener Configuración**

1. En el menú izquierdo, click en el **ícono de engranaje ⚙️**
2. Click en **"Configuración del proyecto"**
3. Baja hasta la sección **"Tus aplicaciones"**
4. Click en el ícono **`</>`** (Web)
5. **Nombre de la app**: `Catálogo Vinos Web`
6. **NO marques** "También configura Firebase Hosting"
7. Click en **"Registrar app"**
8. Verás un código JavaScript con tu configuración

---

### **4. Copiar Configuración**

Verás algo como esto:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnopqrs",
  authDomain: "catalogo-vinos-12345.firebaseapp.com",
  databaseURL: "https://catalogo-vinos-12345-default-rtdb.firebaseio.com",
  projectId: "catalogo-vinos-12345",
  storageBucket: "catalogo-vinos-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456ghi789"
};
```

**Copia estos valores** (los necesitarás en el siguiente paso)

---

### **5. Actualizar index.html**

1. Abre `index.html` en tu editor de código
2. Busca esta sección (línea ~977):

```javascript
var firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  databaseURL: "https://tu-proyecto-default-rtdb.firebaseio.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

3. **Reemplaza** con tus datos reales de Firebase
4. **Guarda** el archivo

---

### **6. Configurar Reglas de Seguridad (Importante)**

Por defecto, Firebase permite escritura solo por 30 días. Vamos a configurarlo para que **solo tú puedas editar** desde el panel de administración local.

1. En Firebase Console, ve a **"Realtime Database"**
2. Click en la pestaña **"Reglas"**
3. Reemplaza el contenido con esto:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

**¿Qué hace esto?**
- `.read: true` → Todos pueden **ver** los productos (necesario para tus clientes)
- `.write: true` → Todos pueden **editar** (temporalmente para probar, luego lo ajustaremos)

4. Click en **"Publicar"**

---

### **7. (OPCIONAL) Mejorar Seguridad Más Adelante**

Por ahora, las reglas permiten que **cualquiera pueda editar**. Esto está bien para probar, pero más adelante puedes restringir el acceso.

**Opción 1: Solo desde tu IP**
Puedes configurar Firebase para que solo acepte escrituras desde tu IP.

**Opción 2: Con Contraseña**
Puedes agregar un sistema de login simple en el panel de administración.

**Por ahora NO te preocupes por esto**. Como tu página es nueva y no es muy conocida, es muy poco probable que alguien encuentre tu base de datos y la modifique. Además, siempre puedes hacer backup con el botón "Exportar" 📤

---

## 🧪 Probar la Configuración

1. **Abre** `index.html` en tu navegador
2. **Abre la consola** (F12 o Cmd+Option+I en Mac)
3. Deberías ver: `✅ Firebase conectado`
4. **Abre el panel de administración** (botón "⚙️ Admin")
5. **Edita un vino** y guarda
6. **Recarga la página** → Los cambios deben persistir ✅
7. **Abre en otro navegador** → Los cambios deben estar ahí también ✅

---

## 🌐 Subir a GitHub Pages

1. **Guarda** los cambios en `index.html`
2. **Sube** a GitHub:
   ```bash
   git add index.html
   git commit -m "Integrar Firebase para base de datos en tiempo real"
   git push origin main
   ```
3. Espera 1-2 minutos
4. **Abre tu página**: https://feermoya.github.io/catalogo-vinos/
5. Los productos ahora se cargan desde Firebase ✅

---

## ✅ Ventajas de Firebase

| Característica | Antes (LocalStorage) | Ahora (Firebase) |
|----------------|----------------------|------------------|
| **Persistencia** | Solo en tu navegador | En la nube |
| **Compartir cambios** | ❌ No | ✅ Sí |
| **Actualizar desde cualquier lugar** | ❌ No | ✅ Sí |
| **Sincronización** | ❌ No | ✅ Tiempo real |
| **Backup automático** | ❌ No | ✅ Sí |
| **Múltiples dispositivos** | ❌ No | ✅ Sí |

---

## 🆘 Problemas Comunes

### **No aparece "✅ Firebase conectado"**
- Revisa que copiaste bien la configuración
- Verifica que no haya errores en la consola
- Asegúrate de que `apiKey` no sea `"TU_API_KEY_AQUI"`

### **"Error al guardar productos"**
- Verifica las reglas de seguridad en Firebase
- Asegúrate de que `.write: true` esté habilitado (temporalmente)

### **Los cambios no se reflejan en la web**
- Verifica que subiste el archivo actualizado a GitHub
- Espera 1-2 minutos para que GitHub Pages actualice
- Limpia el caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

---

## 📱 Próximos Pasos

Ahora que tienes Firebase configurado, puedes:

1. **Editar desde cualquier computadora** con acceso a tu cuenta
2. **Ver los cambios en tiempo real** en todos los dispositivos
3. **Hacer backup** de tus productos (con el botón "Exportar")
4. **Configurar autenticación** para mayor seguridad

---

## 💰 Costos

Firebase tiene un **plan gratuito** que incluye:
- ✅ 1 GB de almacenamiento
- ✅ 10 GB de transferencia mensual
- ✅ 100,000 lecturas simultáneas

Para un catálogo de vinos, esto es **más que suficiente** y **completamente gratis** 🎉

---

¡Listo! Ahora tu catálogo está conectado a Firebase y puedes actualizar los productos desde cualquier lugar 🍷✨


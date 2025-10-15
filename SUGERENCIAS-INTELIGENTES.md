# 🧠 Sistema de Sugerencias Inteligentes

## 📋 Descripción

Sistema que **"piensa por el cliente"** sugiriendo vinos específicos para alcanzar el siguiente nivel de descuento. Elimina la decisión del cliente y facilita la compra.

---

## 🎯 Cambios Implementados

### ✅ **1. Botón "Enviar por WhatsApp" eliminado del carrito principal**
- Ahora solo dice **"🛒 Ver Carrito"**
- **Forza** a que SIEMPRE pasen por el modal del carrito
- El cliente **no puede evitar** ver las sugerencias

### ✅ **2. Sugerencias inteligentes en el modal**
- **"Solo por $X más obtené Y% de descuento"**
- Recomienda vinos específicos con botones de agregar
- **Elimina la decisión** - el cliente solo hace clic

---

## 🧠 Lógica de Sugerencias

### **Estrategia Inteligente:**

1. **Prioridad 1:** Vinos ya en el carrito (aumentar cantidad)
2. **Prioridad 2:** Vinos nuevos más baratos (facilitar decisión)
3. **Máximo 3 sugerencias** para no abrumar

### **Criterios de Selección:**

- ✅ **Stock disponible**
- ✅ **Precio accesible** (más baratos primero)
- ✅ **No repetir** vinos ya en el carrito
- ✅ **Excluir combo del mes** (ID 0)

---

## 🎨 Visualización en el Modal

```
┌────────────────────────────────────────┐
│  🛒 Tu Pedido                     ×   │
├────────────────────────────────────────┤
│  🍷 Desdén Malbec x1                  │
│  🍷 Prófugo Chenin x1                 │
├────────────────────────────────────────┤
│  Subtotal:                   $11.500  │
│  🎉 Descuento (10% por 2):   -$1.150  │
│  Total:                      $10.350  │
├────────────────────────────────────────┤
│  💡 ¡Solo por $3.850 más obtené 15%!  │
│  Agregá 2 vinos más y ahorrá aún más  │
│                                        │
│  🍷 La Azul Malbec ($7.800)          │
│     La Azul · Malbec                  │
│     [➕ Agregar 1 ($7.800)]          │
│                                        │
│  🍷 Don Bosco Reserva ($6.000)       │
│     Don Bosco · Malbec                │
│     [➕ Agregar 1 ($6.000)]          │
├────────────────────────────────────────┤
│  [📱 Enviar Pedido por WhatsApp]     │
│  [🗑️ Vaciar Carrito]                 │
└────────────────────────────────────────┘
```

---

## 🧪 Casos de Prueba

### **Caso 1: Cliente tiene 2 vinos (10% descuento)**
- **Sugerencia:** "¡Solo por $7.800 más obtené 15%!"
- **Recomienda:** Vino más barato disponible
- **Botón:** "➕ Agregar 1 ($7.800)"

### **Caso 2: Cliente tiene 4 vinos (15% descuento)**
- **Sugerencia:** "¡Solo por $X más obtené 18%!"
- **Recomienda:** 2 vinos más baratos
- **Botones:** "➕ Agregar 1 ($Y)" para cada uno

### **Caso 3: Cliente tiene 10+ vinos**
- **Sin sugerencias** (ya tiene el descuento máximo)
- **Mensaje:** "¡Ya tenés el descuento máximo!"

---

## 📊 Ejemplos Prácticos

### **Escenario: Cliente con 2 vinos ($11.500 total)**

**Sin sugerencias:**
- Total: $10.350 (10% descuento)

**Con sugerencia (agregar La Azul Malbec $7.800):**
- Nuevo subtotal: $19.300
- Descuento 15%: -$2.895
- **Nuevo total: $16.405**
- **Ahorro adicional: $1.745** ✨

---

## ⚙️ Configuración

### **Archivo:** `js/smart-suggestions.js`

```javascript
var SUGGESTIONS_CONFIG = {
  enabled: true,           // Activar/desactivar sugerencias
  maxSuggestions: 3,       // Máximo 3 vinos sugeridos
  strategy: 'closest-to-next-tier' // Estrategia de selección
};
```

### **Para desactivar sugerencias:**
```javascript
enabled: false,  // ← Cambiar a false
```

### **Para cambiar cantidad de sugerencias:**
```javascript
maxSuggestions: 2,  // ← Cambiar a 2 o 4
```

---

## 🎯 Beneficios del Sistema

### **Para el Cliente:**
✅ **No tiene que decidir** - le sugerimos qué comprar
✅ **Ve el ahorro claro** - "solo por $X más obtené Y%"
✅ **Proceso más fácil** - un clic y listo
✅ **Mejor experiencia** - se siente ayudado

### **Para el Negocio:**
✅ **Mayor ticket promedio** - incentiva compras mayores
✅ **Más conversiones** - elimina fricción de decisión
✅ **Ventas incrementales** - clientes compran más
✅ **Mejor experiencia** - clientes más satisfechos

---

## 🔄 Flujo de Usuario Mejorado

### **Antes:**
1. Agregar vinos → 2. Clic "WhatsApp" → 3. Enviar

### **Ahora:**
1. Agregar vinos → 2. Clic "Ver Carrito" → 3. **Ver sugerencias** → 4. Agregar más (opcional) → 5. Clic "WhatsApp" → 6. Enviar

---

## 📱 Mensaje de WhatsApp Mejorado

El mensaje ahora incluye el desglose completo con descuentos:

```
Hola! Quiero pedir estos vinos:

• Desdén Malbec Reserva x1 — $5.500
• Prófugo Casa La Primavera Chenin Dulce x1 — $6.000
• La Azul Malbec x1 — $7.800

Subtotal: $19.300
Descuento (15% por 3 vinos): -$2.895

Total: $16.405
```

---

## 🧪 Pruebas Recomendadas

### **Prueba 1: Sugerencias básicas**
1. Agregá 2 vinos al carrito
2. Clic en "🛒 Ver Carrito"
3. **Resultado esperado:** Ver sugerencias para alcanzar 15%

### **Prueba 2: Botones de agregar**
1. En el modal, clic en "➕ Agregar X ($Y)"
2. **Resultado esperado:** Se agrega al carrito y se actualiza el modal

### **Prueba 3: Sin sugerencias**
1. Agregá 10+ vinos al carrito
2. Clic en "🛒 Ver Carrito"
3. **Resultado esperado:** No aparecen sugerencias (ya tiene máximo)

### **Prueba 4: Flujo completo**
1. Agregá 2 vinos → Clic "Ver Carrito"
2. Agregá vino sugerido → Modal se actualiza
3. Clic "Enviar por WhatsApp"
4. **Resultado esperado:** Mensaje con desglose completo

---

## 🎨 Personalización Visual

### **Colores de las sugerencias:**
- **Fondo:** Gradiente suave (blanco a beige)
- **Borde:** Gris claro
- **Botones:** Verde WhatsApp
- **Texto principal:** Color accent (rojo vino)

### **Estilo de los botones:**
```css
background: linear-gradient(135deg, #25D366, #20BA5A);
color: white;
border-radius: 8px;
font-weight: 600;
```

---

## 🔧 Archivos Modificados

### **Nuevos:**
- ✅ `js/smart-suggestions.js` - Sistema de sugerencias

### **Modificados:**
- ✅ `index.html` - Botón "Ver Carrito" + integración sugerencias

---

## 🚀 Próximos Pasos

1. ✅ **Probar en local** - Verificar que las sugerencias aparecen
2. ✅ **Probar flujo completo** - Agregar vinos sugeridos
3. ⏳ **Subir a producción** - Cuando todo funcione bien
4. 💡 **Monitorear resultados** - Ver si aumenta el ticket promedio

---

## 💡 Ideas Futuras

- **Sugerencias por ocasión:** "Perfecto para tu asado del domingo"
- **Sugerencias por precio:** "Otro vino de $5.000 para completar"
- **Sugerencias por bodega:** "¿Te gusta La Azul? También tenemos..."
- **Sugerencias por variedad:** "¿Malbec? Te recomendamos también..."

---

## 🎯 Conclusión

El sistema **"piensa por el cliente"** y elimina la fricción de decisión. Es una herramienta poderosa para incrementar ventas y mejorar la experiencia del usuario.

**¡A probarlo! 🍷🧠✨**

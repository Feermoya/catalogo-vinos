# 🎉 Sistema de Descuentos por Volumen

## 📋 Descripción

Sistema modular de descuentos automáticos que incentiva a los clientes a comprar más vinos. **100% independiente** del código existente - se puede activar/desactivar sin romper nada.

---

## ✅ Configuración Actual (Atractiva)

```javascript
📦 2-3 vinos  → 10% descuento
📦 4-5 vinos  → 15% descuento  
📦 6-9 vinos  → 18% descuento
📦 10+ vinos  → 20% descuento
```

**Garantizado:** Márgenes seguros. Con el descuento máximo (20%), tu margen mínimo sigue siendo positivo en la mayoría de productos.

---

## 🚀 Cómo Probar en Local

### 1. **Abrir el catálogo en tu navegador**

```bash
# Desde la carpeta del proyecto
open index.html
```

O simplemente abrí `index.html` con tu navegador favorito (Chrome, Safari, Firefox).

### 2. **Agregar productos al carrito**

- Agregá **1 vino** → No hay descuento
- Agregá **2-3 vinos** → Verás 10% descuento
- Agregá **4-5 vinos** → Verás 15% descuento
- Agregá **6-9 vinos** → Verás 18% descuento
- Agregá **10+ vinos** → Verás 20% descuento

### 3. **Dónde se muestra el descuento**

✅ **Carrito principal** (abajo a la derecha)
   - Total con badge de descuento verde

✅ **Carrito flotante** (lado derecho)
   - Total actualizado con descuento

✅ **Modal del carrito** (al hacer clic en el carrito flotante)
   - Desglose completo: Subtotal, Descuento, Total
   - Mensaje motivador: "¡Agregá X vinos más y obtené Y% descuento!"

✅ **Mensaje de WhatsApp**
   - Incluye subtotal, descuento aplicado y total final

---

## ⚙️ Cómo ACTIVAR/DESACTIVAR los Descuentos

### Opción 1: Desactivar Temporalmente (Más Rápido)

Abrí el archivo `js/discounts.js` y cambiá:

```javascript
var DISCOUNT_CONFIG = {
  enabled: false,  // ← Cambiar a false
  tiers: [
    // ...
  ]
};
```

### Opción 2: Desactivar Completamente (Más Limpio)

En `index.html`, comentá la línea que carga el módulo:

```html
<!-- <script src="js/discounts.js"></script> -->
```

**¡Eso es todo!** El sistema volverá a funcionar sin descuentos, exactamente como antes.

---

## 🎨 Cómo Modificar los Porcentajes

Abrí `js/discounts.js` y modificá el array `tiers`:

```javascript
var DISCOUNT_CONFIG = {
  enabled: true,
  tiers: [
    // Orden IMPORTANTE: De mayor a menor cantidad
    { minBottles: 10, discount: 15, label: '10+ vinos' },
    { minBottles: 6,  discount: 12, label: '6-9 vinos' },
    { minBottles: 4,  discount: 8,  label: '4-5 vinos' },
    { minBottles: 2,  discount: 5,  label: '2-3 vinos' }
  ]
};
```

**Ejemplos de cambios:**

### Hacer descuentos más agresivos:
```javascript
{ minBottles: 2,  discount: 7,  label: '2-3 vinos' }   // Era 5%
{ minBottles: 4,  discount: 10, label: '4-5 vinos' }   // Era 8%
{ minBottles: 6,  discount: 15, label: '6-9 vinos' }   // Era 12%
{ minBottles: 10, discount: 18, label: '10+ vinos' }   // Era 15%
```

### Agregar un nivel nuevo:
```javascript
tiers: [
  { minBottles: 20, discount: 20, label: '20+ vinos' },  // NUEVO
  { minBottles: 10, discount: 15, label: '10+ vinos' },
  { minBottles: 6,  discount: 12, label: '6-9 vinos' },
  { minBottles: 4,  discount: 8,  label: '4-5 vinos' },
  { minBottles: 2,  discount: 5,  label: '2-3 vinos' }
]
```

---

## 🧪 Ejemplos de Compras con Descuentos

### Ejemplo 1: Cliente compra 2 Malbec ($7.800 c/u)
```
Subtotal: $15.600
Descuento (5% por 2 vinos): -$780
Total: $14.820 ✨
```

### Ejemplo 2: Cliente compra 6 vinos variados (promedio $12.000)
```
Subtotal: $72.000
Descuento (12% por 6 vinos): -$8.640
Total: $63.360 ✨
```

### Ejemplo 3: Cliente compra 10 vinos (promedio $10.000)
```
Subtotal: $100.000
Descuento (15% por 10 vinos): -$15.000
Total: $85.000 ✨

¡El cliente ahorra casi 2 vinos gratis! 🎉
```

---

## 📊 Análisis de Márgenes (Por Seguridad)

**Margen mínimo en tu catálogo:** 20.5% (Mairena Blend)
**Descuento máximo ofrecido:** 15%
**Margen final mínimo garantizado:** 5.5%

✅ **Conclusión:** Incluso en el peor escenario (vender solo vinos de bajo margen con descuento máximo), **siempre ganás**.

---

## 📱 Cómo se ve en WhatsApp

El mensaje generado incluye el desglose completo:

```
Hola! Quiero pedir estos vinos:

• La Azul Malbec x2 — $7.800
• Las Perdices Malbec x2 — $8.500
• Don Bosco Reserva x2 — $6.000

Subtotal: $44.600
Descuento (12% por 6 vinos): -$5.352

Total: $39.248
```

---

## 🔧 Archivos Modificados

### Nuevos archivos:
- ✅ `js/discounts.js` - Sistema modular de descuentos

### Archivos actualizados (cambios mínimos y seguros):
- ✅ `index.html` - Agregado script de descuentos y mejora en modal
- ✅ `js/app.js` - Integración con descuentos (con fallback)
- ✅ `js/floatingCart.js` - Muestra descuentos en carrito flotante

**Todos los cambios incluyen fallbacks** → Si quitás `discounts.js`, el sistema funciona exactamente como antes.

---

## ❓ Preguntas Frecuentes

### ¿Afecta al código existente?
**No.** Todo está modularizado con verificaciones `if(typeof function === 'function')`. Si desactivás el módulo, todo sigue funcionando.

### ¿Los descuentos se guardan en Firebase?
**No.** Los descuentos se calculan en tiempo real según la cantidad de vinos en el carrito. No requiere cambios en la base de datos.

### ¿Puedo tener descuentos diferentes por categoría?
Sí, pero requeriría modificaciones. El sistema actual aplica descuentos globales por cantidad total de botellas.

### ¿Cómo afecta al inventario?
No afecta. El sistema de stock sigue funcionando igual. Los descuentos son solo sobre el precio.

---

## 🎯 Próximos Pasos Sugeridos

1. ✅ **Probalo en local** - Agregá vinos y verificá que los descuentos se calculan bien
2. ✅ **Probá el mensaje de WhatsApp** - Verificá que el desglose sea claro
3. ✅ **Ajustá porcentajes si es necesario** - Según tu estrategia comercial
4. ⏳ **Subí a producción** - Cuando estés 100% seguro

---

## 💡 Tips de Venta

- El mensaje motivador ("¡Agregá 2 vinos más...!") incentiva compras mayores
- Los clientes ven el ahorro en tiempo real → conversión más alta
- Descuentos progresivos → ticket promedio más alto
- El desglose transparente genera confianza

---

¿Dudas o quieres modificar algo? ¡Avisame! 🍷


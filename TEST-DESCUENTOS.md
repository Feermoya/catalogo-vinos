# 🧪 Pruebas del Sistema de Descuentos

## 📝 Checklist de Pruebas

### ✅ Prueba 1: Sin descuento (1 vino)
1. Abrí `index.html` en tu navegador
2. Agregá **1 vino** al carrito
3. **Resultado esperado:**
   - Total normal, sin badge de descuento
   - Ejemplo: 1 × $7.800 = $7.800

---

### ✅ Prueba 2: Descuento 5% (2-3 vinos)
1. Agregá **2 vinos** al carrito
2. **Resultado esperado:**
   - Badge verde con "🎉 -5%" en el total del carrito
   - Total con descuento aplicado
   - Ejemplo: 2 × $7.800 = $15.600 → Con 5%: $14.820

3. Verificá el **carrito flotante** (derecha):
   - Debe mostrar el total con descuento

4. Hacé clic en el **carrito flotante**:
   - Debe abrir modal con desglose:
     ```
     Subtotal: $15.600
     🎉 Descuento (5% por 2 vinos): -$780
     Total: $14.820
     ```
   - Debe mostrar mensaje: "💡 ¡Agregá 2 vinos más y obtené 8% de descuento!"

5. Hacé clic en **"Enviar por WhatsApp"**:
   - Debe mostrar el mensaje con el desglose completo

---

### ✅ Prueba 3: Descuento 8% (4-5 vinos)
1. Agregá **4 vinos** al carrito
2. **Resultado esperado:**
   - Badge verde con "🎉 -8%"
   - Ejemplo: 4 × $7.800 = $31.200 → Con 8%: $28.704

3. Mensaje incentivo debe cambiar a:
   - "💡 ¡Agregá 2 vinos más y obtené 12% de descuento!"

---

### ✅ Prueba 4: Descuento 12% (6-9 vinos)
1. Agregá **6 vinos** al carrito
2. **Resultado esperado:**
   - Badge verde con "🎉 -12%"
   - Ejemplo: 6 × $7.800 = $46.800 → Con 12%: $41.184

3. Mensaje incentivo debe cambiar a:
   - "💡 ¡Agregá 4 vinos más y obtené 15% de descuento!"

---

### ✅ Prueba 5: Descuento máximo 15% (10+ vinos)
1. Agregá **10 vinos** al carrito
2. **Resultado esperado:**
   - Badge verde con "🎉 -15%"
   - Ejemplo: 10 × $7.800 = $78.000 → Con 15%: $66.300

3. **No debe aparecer mensaje incentivo** (ya está en el tier máximo)

---

### ✅ Prueba 6: Mezcla de productos
1. Agregá vinos de diferentes precios:
   - 2 × La Azul Malbec ($7.800)
   - 2 × Wayra Cabernet Franc ($20.000)
   - 2 × Don Bosco Reserva ($6.000)

2. **Resultado esperado:**
   - Subtotal: $67.600
   - Descuento (12% por 6 vinos): -$8.112
   - Total: $59.488

---

### ✅ Prueba 7: Mensaje de WhatsApp
1. Con 4 vinos en el carrito, clic en "Enviar por WhatsApp"
2. **Resultado esperado:**
   ```
   Hola! Quiero pedir estos vinos:

   • [Nombre] x2 — $[precio]
   • [Nombre] x2 — $[precio]

   Subtotal: $[subtotal]
   Descuento (8% por 4 vinos): -$[descuento]

   Total: $[total]
   ```

---

### ✅ Prueba 8: Desactivar descuentos
1. Abrí `js/discounts.js`
2. Cambiá `enabled: true` por `enabled: false`
3. Recargá la página
4. **Resultado esperado:**
   - Todo funciona como antes
   - No hay badges de descuento
   - Totales sin descuento
   - Mensaje de WhatsApp sin desglose

---

## 🎯 Casos Extremos a Probar

### Caso 1: Producto sin stock
1. Agregá un producto agotado (Mad Bird tiene stock: 0)
2. **Resultado esperado:**
   - No se puede agregar
   - Descuentos funcionan con los productos disponibles

### Caso 2: Agregar y quitar productos
1. Agregá 6 vinos (12% descuento)
2. Quitá 3 vinos (debe bajar a 5% descuento)
3. Agregá 5 más (debe subir a 15% descuento)
4. **Resultado esperado:**
   - El descuento se recalcula automáticamente
   - El mensaje incentivo se actualiza

### Caso 3: Vaciar carrito
1. Con varios productos en el carrito
2. Clic en "Vaciar"
3. **Resultado esperado:**
   - Carrito vacío
   - No hay descuentos
   - Carrito flotante desaparece

---

## 🐛 Qué Revisar si Algo No Funciona

### Los descuentos NO aparecen:
1. ✅ Verificá que `discounts.js` esté cargado:
   - Abrí la consola del navegador (F12)
   - Debe decir: No hay errores de "discounts.js not found"

2. ✅ Verificá que `enabled: true` en `discounts.js`

3. ✅ Probá recargando la página (Ctrl+R o Cmd+R)

### Los totales son incorrectos:
1. ✅ Verificá que estás sumando la cantidad correcta de vinos
2. ✅ Revisá la consola del navegador por errores JavaScript

### El mensaje de WhatsApp no tiene descuentos:
1. ✅ Verificá que tengas al menos 2 vinos en el carrito
2. ✅ Probá con más de 2 vinos para confirmar que el desglose aparece

---

## 📊 Tabla de Referencia Rápida

| Cantidad | Descuento | Ejemplo (vino $10.000) | Total Final |
|----------|-----------|------------------------|-------------|
| 1 vino   | 0%        | $10.000                | $10.000     |
| 2 vinos  | 5%        | $20.000 - $1.000       | $19.000     |
| 3 vinos  | 5%        | $30.000 - $1.500       | $28.500     |
| 4 vinos  | 8%        | $40.000 - $3.200       | $36.800     |
| 5 vinos  | 8%        | $50.000 - $4.000       | $46.000     |
| 6 vinos  | 12%       | $60.000 - $7.200       | $52.800     |
| 9 vinos  | 12%       | $90.000 - $10.800      | $79.200     |
| 10 vinos | 15%       | $100.000 - $15.000     | $85.000     |
| 20 vinos | 15%       | $200.000 - $30.000     | $170.000    |

---

## ✅ Checklist Final Antes de Subir a Producción

- [ ] Probé con 1 vino (sin descuento)
- [ ] Probé con 2-3 vinos (5% descuento)
- [ ] Probé con 4-5 vinos (8% descuento)
- [ ] Probé con 6-9 vinos (12% descuento)
- [ ] Probé con 10+ vinos (15% descuento)
- [ ] El carrito flotante muestra el descuento
- [ ] El modal del carrito muestra el desglose completo
- [ ] El mensaje de WhatsApp incluye el desglose
- [ ] El mensaje incentivo aparece correctamente
- [ ] Probé agregar y quitar productos (recalcula bien)
- [ ] Probé vaciar el carrito (funciona bien)
- [ ] No hay errores en la consola del navegador
- [ ] Los márgenes siguen siendo positivos en todos los casos

---

## 🚀 ¡Todo Listo!

Si todas las pruebas pasan, el sistema está listo para producción.

**Recordá:** Siempre podés desactivar los descuentos cambiando `enabled: false` en `js/discounts.js` sin romper nada.

---

**¿Algún problema?** Revisá la consola del navegador (F12) para ver errores.


import { Schema, model } from 'mongoose'

/**
 * Esquema de persistencia de los productos añadidos al carrito de un usuario.
 *
 * @remarks
 * Cada registro vincula un producto con un usuario mediante referencias de
 * MongoDB. Los identificadores y la cantidad son obligatorios. Mongoose
 * gestiona automáticamente las marcas de tiempo `createdAt` y `updatedAt`.
 */
const cartProductSchema = new Schema({
  /** Identificador del producto añadido al carrito. */
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  /** Número de unidades del producto en el carrito. */
  quantity: { type: Number, required: true },
  /** Identificador del usuario propietario del carrito. */
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

/**
 * Modelo Mongoose utilizado para consultar y modificar productos del carrito.
 *
 * @remarks
 * Está asociado a la colección `cartproducts` y se construye a partir de
 * {@link cartProductSchema}.
 */
const CartProduct = model('CartProduct', cartProductSchema);

export default CartProduct;
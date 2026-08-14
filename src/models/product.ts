import { Schema, model } from 'mongoose'

/**
 * Esquema de persistencia de los productos disponibles en la aplicación.
 *
 * @remarks
 * Los campos `name`, `brandName`, `category`, `description`, `price` y
 * `sellingPrice` son obligatorios. `productImage` almacena un arreglo de
 * imágenes sin una restricción de tipo adicional. Mongoose gestiona
 * automáticamente las marcas de tiempo `createdAt` y `updatedAt`.
 */
const productSchema = new Schema({
  /** Nombre del producto. */
  name: { type: String, required: true },
  /** Nombre de la marca del producto. */
  brandName: { type: String, required: true },
  /** Categoría a la que pertenece el producto. */
  category: { type: String, required: true },
  /** Imágenes asociadas al producto. */
  productImage: [],
  /** Descripción detallada del producto. */
  description: { type: String, required: true },
  /** Precio habitual del producto. */
  price: { type: Number, required: true },
  /** Precio de venta del producto. */
  sellingPrice: { type: Number, required: true },
}, { timestamps: true });

/**
 * Modelo Mongoose utilizado para consultar y modificar productos.
 *
 * @remarks
 * Está asociado a la colección `products` y se construye a partir de
 * {@link productSchema}.
 */
const Product = model('Product', productSchema);

export default Product;

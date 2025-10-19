import { ProductInput, ProductInquiry } from "../libs/types/product";
import { Product } from "../libs/types/product";
import Errors from "../libs/types/Errors";
import { HttpCode } from "../libs/types/Errors";
import { Message } from "../libs/types/Errors";
import { ProductUpdateInput } from "../libs/types/product";
import { shapeIntoMongooseObjectId } from "../libs/types/config";
import ProductModel from "../schemas/Product.model";
import { ProductStatus } from "../libs/enums/product.enum";
import { T } from "../libs/types/common";


class ProductService {
  private readonly productModel;

  constructor() {
    this.productModel = ProductModel;
  }
/**SPA */

 public async getProducts(inquiry: ProductInquiry): Promise<Product[]> {
    const match: T = { productStatus: ProductStatus.ACTIVE };

    if (inquiry.productCollection)
      match.productCollection = inquiry.productCollection;

    if (inquiry.search) {
      match.productName = { $regex: new RegExp(inquiry.search, "i") };
    }

    const sort: T =
      inquiry.order === "productPrice"
        ? { [inquiry.order]: 1 } //narxlar pasdan tepaga //dinamik key array emas
        : { [inquiry.order]: -1 }; // recentlydan 

    const result = await this.productModel
      .aggregate([ 
        //pipeleni tuzishga yor,1 necha collectionlarni bir vaqtda oqishni 
        { $match: match },
        { $sort: sort },
        { $skip: (inquiry.page * 1 - 1) * inquiry.limit },
        { $limit: inquiry.limit * 1 },
      ])
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }
  
  // SSR *//
 public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    return result;
  }


public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      return await this.productModel.create(input);
    } catch (err) {
      console.error("Error, model:createNewProduct;", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput
  ): Promise<Product> {
    //string=> ObjecId
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

    return result;
  }
}

export default ProductService;
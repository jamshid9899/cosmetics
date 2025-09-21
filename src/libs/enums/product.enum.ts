export enum ProductSize {
  SMALL = "SMALL",      // kichik qadoq
  NORMAL = "NORMAL",    // standart
  LARGE = "LARGE",      // katta qadoq
  SET = "SET",          // set (masalan, atir + krem)
}

export enum ProductVolume {
  TEN_ML = 10,
  THIRTY_ML = 30,
  FIFTY_ML = 50,
  HUNDRED_ML = 100,
  ONE_FIFTY_ML = 150,
  TWO_HUNDRED_ML = 200,
}

export enum ProductStatus {
  PAUSE = "PAUSE",      // savdoda emas
  ACTIVE = "ACTIVE",    // aktiv savdoda
  DELETE = "DELETE",    // o‘chirilgan
}

export enum ProductCollection {
  PERFUME = "PERFUME",          // atirlar
  SKINCARE = "SKINCARE",        // teri parvarishi
  MAKEUP = "MAKEUP",            // makiyaj
  HAIRCARE = "HAIRCARE",        // soch parvarishi
  BODYCARE = "BODYCARE",        // tana parvarishi
  ACCESSORY = "ACCESSORY",      // aksessuarlar
  OTHER = "OTHER",              // boshqa
}
import Common "common";

module {
  public type ProductId = Common.ProductId;

  public type Product = {
    id : ProductId;
    name : Text;
    brand : Text;
    category : Text;
    subcategory : Text;
    imageUrl : Text;
    price : Int;
    originalPrice : Int;
    discount : Int;
    discountLabel : Text;
    weight : Text;
    rating : Float;
    reviewCount : Int;
    tags : [Text];
    inStock : Bool;
  };

  public type CartItem = {
    productId : ProductId;
    quantity : Int;
  };
};

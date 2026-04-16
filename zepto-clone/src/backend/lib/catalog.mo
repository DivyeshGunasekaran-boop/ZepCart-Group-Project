import Types "../types/catalog";
import Runtime "mo:core/Runtime";

module {
  public func getProducts() : [Types.Product] {
    Runtime.trap("not implemented");
  };

  public func getProductsByCategory(category : Text) : [Types.Product] {
    Runtime.trap("not implemented");
  };

  public func getFeaturedProducts() : [Types.Product] {
    Runtime.trap("not implemented");
  };

  public func getBestsellers() : [Types.Product] {
    Runtime.trap("not implemented");
  };
};

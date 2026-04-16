import Types "../types/catalog";
import CatalogLib "../lib/catalog";
import Runtime "mo:core/Runtime";

mixin () {
  public query func getProducts() : async [Types.Product] {
    Runtime.trap("not implemented");
  };

  public query func getProductsByCategory(category : Text) : async [Types.Product] {
    Runtime.trap("not implemented");
  };

  public query func getFeaturedProducts() : async [Types.Product] {
    Runtime.trap("not implemented");
  };

  public query func getBestsellers() : async [Types.Product] {
    Runtime.trap("not implemented");
  };
};

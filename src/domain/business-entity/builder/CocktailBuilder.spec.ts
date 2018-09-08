import Name from "../../value-object/Name";
import Quantity from "../../value-object/Quantity";
import CocktailBuilder from "./CocktailBuilder";
import ComponentBuilder from "./ComponentBuilder";

describe("CocktailBuilder", () => {
  test("should build a cocktail from scratch", () => {
    const A_NAME = new Name("A NAME");
    const A_COMPONENT = ComponentBuilder
      .aComponent()
      .withQuantity(new Quantity(12))
      .build();
    const cocktail = CocktailBuilder
      .aCocktail()
      .withName(A_NAME)
      .withComponents([A_COMPONENT])
      .build();
    expect(cocktail.name).toEqual(A_NAME);
    expect(cocktail.components).toHaveLength(1);

  });
});

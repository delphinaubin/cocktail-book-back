import Name from "../../value-object/Name";
import Quantity from "../../value-object/Quantity";
import CocktailBuilder from "./CocktailBuilder";
import ComponentBuilder from "./ComponentBuilder";
import Id from '../../value-object/Id';

describe("CocktailBuilder", () => {
  test("should build a cocktail from scratch", () => {
    const A_NAME = new Name("A NAME");
    const AN_ID = new Id("1")
    const A_COMPONENT = ComponentBuilder
      .aComponent()
      .withQuantity(new Quantity(12))
      .build();
    const cocktail = CocktailBuilder
      .aCocktail()
      .withId(AN_ID)
      .withName(A_NAME)
      .withComponents([A_COMPONENT])
      .build();
    expect(cocktail.id).toEqual(AN_ID);
    expect(cocktail.name).toEqual(A_NAME);
    expect(cocktail.components).toHaveLength(1);

  });
});

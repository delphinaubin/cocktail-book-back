import Name from "../../value-object/Name";
import Quantity from "../../value-object/Quantity";
import Component from "../Component";
import ComponentBuilder from "./ComponentBuilder";
import IngredientBuilder from "./IngredientBuilder";
describe("ComponentBuilder", () => {
  test("should build a component from scratch", () => {
    const A_QUANTITY = new Quantity(12);
    const AN_INGREDIENT = IngredientBuilder
      .anIngredient()
      .withName(new Name("A_NAME"))
      .build();
    const component = ComponentBuilder
      .aComponent()
      .withIngredient(AN_INGREDIENT)
      .withQuantity(A_QUANTITY)
      .build();
    expect(component).toBeInstanceOf(Component);
    expect(component.ingredient).toEqual(AN_INGREDIENT);
    expect(component.quantity).toEqual(A_QUANTITY);
  });
});

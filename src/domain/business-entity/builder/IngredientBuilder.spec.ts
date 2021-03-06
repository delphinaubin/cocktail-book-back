import Color from '../../value-object/Color';
import Name from '../../value-object/Name';
import Unit from '../../value-object/Unit';
import IngredientBuilder from './IngredientBuilder';
import Id from '../../value-object/Id';

describe('IngredientBuilder', () => {
  test('should build an ingredient from scratch', () => {
    const AN_ID = new Id('1');
    const A_NAME = new Name('A_NAME');
    const A_COLOR = new Color('Red');
    const AN_UNIT = new Unit('ml');
    const ingredient = IngredientBuilder
      .anIngredient()
      .withId(AN_ID)
      .withName(A_NAME)
      .withColor(A_COLOR)
      .withUnit(AN_UNIT)
      .build();

    expect(ingredient.id).toEqual(AN_ID);
    expect(ingredient.name).toEqual(A_NAME);
    expect(ingredient.color).toEqual(A_COLOR);
    expect(ingredient.unit).toEqual(AN_UNIT);
  });
});

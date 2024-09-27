import RecipeAPIResponseType from './RecipeAPIResponseType';

type RecipeData = Pick<RecipeAPIResponseType, 'id' | 'name'>;

export default RecipeData;

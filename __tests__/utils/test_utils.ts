import {ReactTestRenderer, ReactTestInstance} from 'react-test-renderer';

const predicateForTestID = (testID: string) => (n: any): boolean =>
  n.props.testID === testID && typeof n.type === 'function';

/**
 * @param node - ReactTestRender
 * @param testID - String - The test ID that you are looking for.
 * This is here as a result of https://github.com/facebook/react-native/issues/16281
 * there was an issue that would cause lookups to return twice the amount of items
 * it would have the component and a string of the component
 * we look for items with a testID prop matching the one passed in
 * then limit it to the functions in the list ignoring the stings.
 */
export const utilGetAllByTestID = (
  node: ReactTestRenderer,
  testID: string,
): Array<ReactTestInstance> => node.root.findAll(predicateForTestID(testID));

/**
 * This finds the first occurrence of an element in the supplied node element by
 * its testID.
 *
 * @param node - ReactTestRender
 * @param testID - String - The test ID that you are looking for.
 */
export const utilGetFirstByTestID = (
  node: ReactTestRenderer,
  testID: string,
): ReactTestInstance | undefined => node.root.find(predicateForTestID(testID));

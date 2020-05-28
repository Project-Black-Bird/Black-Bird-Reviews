import store from "../../redux/store";
import * as reducer from "../../redux/reducer";
describe("redux store", () => {
  let initialState;
  beforeEach(() => {
    initialState = store.getState();
  });
  it("should let you dispatch", () => {
    expect(initialState).toEqual(reducer.initialState);
  });
});

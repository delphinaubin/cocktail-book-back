export type Mock<T> = {
  [P in keyof T]: jest.Mock<{}> ;
} & T;

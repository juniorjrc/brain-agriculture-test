export default class TotalAreaValidator {
  public static validate(
    totalArea: number,
    arableArea: number,
    vegetableArea: number
  ) {
    const sumArea = arableArea + vegetableArea;

    if (sumArea > totalArea) {
      return false;
    }
    return true;
  }
}

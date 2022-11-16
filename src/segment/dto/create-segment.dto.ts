export class CreateSegmentDto {
  public readonly trackId: number;
  public readonly title: string;
  public readonly description: string;
  public readonly initialPointId: number;
  public readonly finalPointId: number;
}

export  class Stair {
  public _name: string;
  public _description: string;
  public _riseTreadMin: number;
  public _riseTreadMax: number;
  public _goingTreadMin: number;
  public _goingTreadMax: number;
  public _pitch: number;
  public _active: boolean;

  constructor(
    _name: string, 
    _description: string,
    _riseTreadMin: number,
    _riseTreadMax: number,
    _goingTreadMin: number,
    _goingTreadMax: number,
    _pitch: number,
    _active: boolean
    ) {
      this._name = _name;
      this._description = _description;
      this._riseTreadMin = _riseTreadMin;
      this._riseTreadMax = _riseTreadMax;
      this._goingTreadMin = _goingTreadMin;
      this._goingTreadMax = _goingTreadMax;
      this._pitch = _pitch;
      this._active = _active;
  }
}
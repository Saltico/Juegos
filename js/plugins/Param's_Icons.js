/*:
* @plugindesc Change Parameter's Name to icon
* V1.1    Read help
* @author mrcopra
*
* @help
* Change parameters names in Database-->Terms to number of icon's ID
*/
Window_Status.prototype.drawParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
        var paramId = i + 2;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
       this.drawIcon(Number($dataSystem.terms.params[paramId-2]),x,y2,160);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x +30, y2, 60, 'right');
    }
};

Window_EquipStatus.prototype.drawParamName = function(x, y, paramId) {
    this.drawIcon(Number($dataSystem.terms.params[paramId-2]),x,y,120);
};

Window_StatCompare.prototype.drawItem = function(x, y, paramId) {
    this.drawDarkRect(x, y, this.contents.width, this.lineHeight());
  this.drawIcon(Number($dataSystem.terms.params[paramId]),x,y);
    this.drawCurrentParam(y, paramId);
    this.drawRightArrow(y);
    if (!this._tempActor) return;
    this.drawNewParam(y, paramId);
    this.drawParamDifference(y, paramId);
};

Window_StatCompare.prototype.drawParamName = function(y, paramId) {
    var x = this.textPadding();
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.param(paramId), x, y, this._paramNameWidth);
};

Window_StatCompare.prototype.drawCurrentParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
    this.resetTextColor();
    var actorparam = Yanfly.Util.toGroup(this._actor.param(paramId));
    this.drawText(actorparam,80, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawRightArrow = function(y) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._arrowWidth + this._bonusValueWidth;
    var dw = this.textWidth('\u2192' + ' ');
    this.changeTextColor(this.systemColor());
    this.drawText('\u2192', 200, y, dw, 'center');
};

Window_StatCompare.prototype.drawNewParam = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._paramValueWidth + this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    this.drawText(actorparam, 250, y, this._paramValueWidth, 'right');
};

Window_StatCompare.prototype.drawParamDifference = function(y, paramId) {
    var x = this.contents.width - this.textPadding();
    x -= this._bonusValueWidth;
    var newValue = this._tempActor.param(paramId);
    var diffvalue = newValue - this._actor.param(paramId);
    if (diffvalue === 0) return;
    var actorparam = Yanfly.Util.toGroup(newValue);
    this.changeTextColor(this.paramchangeTextColor(diffvalue));
    var text = Yanfly.Util.toGroup(diffvalue);
    if (diffvalue > 0) {
      text = ' (+' + text + ')';
    } else {
      text = ' (' + text + ')';
    }
    this.drawText(text, x, y, this._bonusValueWidth, 'left');
};
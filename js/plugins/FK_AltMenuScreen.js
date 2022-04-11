//======================================================
// FK_AltMenuScreen.js
//======================================================

/*:
 * @plugindesc メニュー画面のステータス表示変更プラグイン
 * @author Fumi
 *
 * @param maxColsMenu
 * @desc メニュー画面に表示するアクターの最大数（5人以上は未対応）
 * @default 4
 *
 * @param actorName
 * @desc メニュー画面にアクター名を表示するか（0:OFF 1:ON）
 * @default 1
 *
 * @param actorLevel
 * @desc メニュー画面にアクターレベルを表示するか（0:OFF 1:ON）
 * @default 1
 *
 * @param actorClass
 * @desc メニュー画面にアクター職業を表示するか（0:OFF 1:ON）
 * @default 1
 *
  * @param actorHp
 * @desc メニュー画面にアクターHPを表示するか（0:OFF 1:ON）
 * @default 1
 *
 * @param actorMp
 * @desc メニュー画面にアクターMPを表示するか（0:OFF 1:ON）
 * @default 1
 *
 * @param actorIcons
 * @desc メニュー画面にアクターアイコンを表示するか（0:OFF 1:ON）
 * @default 1
 *
* @help このプラグインはメニュー画面のステータス表示を変更するプラグインです。
 *
 * プラグインコマンドはありません。
 *
 * アクターに立ち絵を利用します。
 *
 * アクターのメモ欄に以下のように記載してください。
 * <stand_picture:画像名> 画像名が、そのアクターの立ち絵として表示されます。
 * 画像は img/pictures に追加してください。
 * 記入例
 * <stand_picture:image>
 *
 */

 (function()
 {
	// ここにプラグイン処理を記載.
 	var PLUGIN_NAME = 'FK_AltMenuScreen';
 	var param = PluginManager.parameters(PLUGIN_NAME);
    var maxColsMenuWnd = Number(param['maxColsMenu'] || 4);
    var actorNameMenu = Number(param['actorName'] || 1);
    var actorLevelMenu = Number(param['actorLevel'] || 1);
    var actorClassMenu = Number(param['actorClass'] || 1);
    var actorHpMenu = Number(param['actorHp'] || 1);
    var actorMpMenu = Number(param['actorMp'] || 1);
    var actorIconsMenu = Number(param['actorIcons'] || 1);

    var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function()
	{
        _Scene_Menu_create.call(this);
        this._statusWindow.x = this._commandWindow.width;
        this._statusWindow.y = 0;
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
    };

    Window_MenuStatus.prototype.maxCols = function()
	{
        return maxColsMenuWnd;//１ページのアクター数
    };

    Window_MenuStatus.prototype.numVisibleRows = function()
	{
        return 1;
    };

	Window_MenuStatus.prototype.drawItemImage = function(index)
	{
        var actor = $gameParty.members()[index];
        var rect = this.itemRectForText(index);
        // 画像をロード.
        var bitmapName = $dataActors[actor.actorId()].meta.stand_picture;
        var bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null;
        var w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
        var h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
        var lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        if(bitmap)
		{
            var sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
            //var sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
            var sy = 0;
            var dx = (bitmap.width > rect.width) ? rect.x :
                rect.x + (rect.width - bitmap.width) / 2;
            var dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2;
            this.contents.blt(bitmap, sx, sy, w, h, dx, dy);
        }
		else
		{	// 画像が設定されていない場合、デフォルトのものを表示.
            this.drawActorFace(actor, rect.x, rect.y + lineHeight * 2.5, w, h);
        }
        this.changePaintOpacity(true);
	};

	Window_MenuStatus.prototype.drawItemStatus = function(index)
	{
		var actor = $gameParty.members()[index];
		var rect = this.itemRectForText(index);
		var x = rect.x;
		var y = rect.y;
		var width = rect.width;
		var bottom = y + rect.height;
		var lineHeight = this.lineHeight();
		if (actorNameMenu)
		{
			this.drawActorName(actor, x, y + lineHeight * 0, width);
		}
		if (actorLevelMenu)
		{
			this.drawActorLevel(actor, x, y + lineHeight * 1, width);
		}
		if (actorClassMenu)
		{
			this.drawActorClass(actor, x, bottom - lineHeight * 4, width);
		}
		if (actorHpMenu)
		{
			this.drawActorHp(actor, x, bottom - lineHeight * 3, width);
		}
		if (actorMpMenu)
		{
			this.drawActorMp(actor, x, bottom - lineHeight * 2, width);
		}
		if (actorIconsMenu)
		{
			this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
		}
	};
 })();
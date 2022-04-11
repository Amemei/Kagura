/*:ja
 * @plugindesc  ゲーム起動時にインベントCG、立ち絵をキャッシュする（あらかじめ読み込む）
 * @author      haitoko
 * @param       none
 * @desc        none
 * @default     none
 * @help        【説明】
 * RPGツクールMVのデフォルトの仕様上Pictureフォルダ内の画像データをキャッシュして
 * いないので、初回の立ち絵表示の際、次の立ち絵切り替えをするとき一瞬チラツキが生
 * じるので、立ち絵切替時のチラツキをなくします。
 *
 * 【使い方】
 * ImageCache.jsファイルを開いてLoadImageAll()内に書いてあるように、
 * ImageManager.loadPicture("picturesフォルダの画像名を指定してください。");
 * 
 * 【補足】
 * rpg_core.jsのバージョンがv1.6.1でないと正常に動かない可能性があるので気をつけてください。
 *
 * 【最終編集日】
 * 2019年9月17日
 */

(function () {
    //=======================================================================================//
    // 画像を予め読み込む
    //=======================================================================================//
    function LoadImageAll() {
    	//---------------------------------------------------------------------------------------//
        // img/picturesファオルダ内にある、キャッシュしたい画像ファイル名を記載
        //---------------------------------------------------------------------------------------//
        ImageManager.loadPicture("186cg01_01A");
        ImageManager.loadPicture("186cg01_01B");
        ImageManager.loadPicture("186cg01_02A");
        ImageManager.loadPicture("186cg01_02B");
        ImageManager.loadPicture("186cg01_03A");
        ImageManager.loadPicture("186cg01_03B");
        ImageManager.loadPicture("186cg01_04A");
        ImageManager.loadPicture("186cg01_04B");
	
        ImageManager.loadPicture("186cg02_01A");
        ImageManager.loadPicture("186cg02_01B");
        ImageManager.loadPicture("186cg02_02A");
        ImageManager.loadPicture("186cg02_02B");
        ImageManager.loadPicture("186cg02_03A");
        ImageManager.loadPicture("186cg02_03B");
        ImageManager.loadPicture("186cg02_04A");
        ImageManager.loadPicture("186cg02_04B");
        ImageManager.loadPicture("186cg02_05A");
        
	 	ImageManager.loadPicture("186cg03_01A");
        ImageManager.loadPicture("186cg03_01B");
        ImageManager.loadPicture("186cg03_02A");
        ImageManager.loadPicture("186cg03_02B");
        ImageManager.loadPicture("186cg03_03A");
        ImageManager.loadPicture("186cg03_03B");
        ImageManager.loadPicture("186cg03_04A");
        ImageManager.loadPicture("186cg03_04B");

        ImageManager.loadPicture("186cg04_01A");
        ImageManager.loadPicture("186cg04_01B");
        ImageManager.loadPicture("186cg04_02A");
        ImageManager.loadPicture("186cg04_02B");
        ImageManager.loadPicture("186cg04_03A");
        ImageManager.loadPicture("186cg04_03B");
        ImageManager.loadPicture("186cg04_04A");
        ImageManager.loadPicture("186cg04_04B");

        ImageManager.loadPicture("186cg05_01A");
        ImageManager.loadPicture("186cg05_01B");
        ImageManager.loadPicture("186cg05_02A");
        ImageManager.loadPicture("186cg05_02B");
        ImageManager.loadPicture("186cg05_03A");
        ImageManager.loadPicture("186cg05_03B");
        ImageManager.loadPicture("186cg05_04A");
        ImageManager.loadPicture("186cg05_04B");

        ImageManager.loadPicture("bar");
        ImageManager.loadPicture("bar_bg");
        ImageManager.loadPicture("メッセージウィンドウ");
		
        ImageManager.loadPicture("立ち絵にやにや");
        ImageManager.loadPicture("立ち絵にやにや興奮");
        ImageManager.loadPicture("立ち絵楽");
        ImageManager.loadPicture("立ち絵楽興奮");
        ImageManager.loadPicture("立ち絵喜");
        ImageManager.loadPicture("立ち絵喜興奮");
        ImageManager.loadPicture("立ち絵驚き");
        ImageManager.loadPicture("立ち絵驚き興奮");
        ImageManager.loadPicture("立ち絵照れ");
        ImageManager.loadPicture("立ち絵照れ興奮");
        ImageManager.loadPicture("立ち絵舌なめずり");
        ImageManager.loadPicture("立ち絵舌なめずり興奮");
        ImageManager.loadPicture("立ち絵怒");
        ImageManager.loadPicture("立ち絵怒興奮");
        ImageManager.loadPicture("立ち絵悩み");
        ImageManager.loadPicture("立ち絵悩み興奮");
		
 		//console.log("ImageCache.js:LoadImageAll");
    }

    //=======================================================================================//
    // Scene_Boot :  再定義
    //=======================================================================================//
    var sceneBoot = Scene_Boot.loadSystemImages;
    Scene_Boot.loadSystemImages = function () {
        sceneBoot.call(this);
        LoadImageAll();
        //console.log("scene_boot picture load");
    };

	//=======================================================================================//
	// <summary>
    // ImageCache
	// </summary>
	// <remarks>
	// rpg_core.js v1.6.1 のバージョンあたりで画像キャッシュの制限が追加されているっぽくて
	// 今回は早めの対応のため、キャッシュ削除判定周りのを改変しています。
	// </remarks>
    //=======================================================================================//
	ImageCache.prototype._truncateCache = function(){
		var items = this._items;
		var sizeLeft = ImageCache.limit;

		Object.keys(items).map(function(key){
			return items[key];
		}).sort(function(a, b){
			return b.touch - a.touch;
		}).forEach(function(item){
			//if(sizeLeft > 0 || this._mustBeHeld(item)){
				var bitmap = item.bitmap;
				sizeLeft -= bitmap.width * bitmap.height;
			//}
			//else{
			//   delete items[item.key];
			//}
			//console.log(item.key);
		}.bind(this));
	};
})();

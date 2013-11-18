##Selectのビジュアルを変更できる
- select要素をul,liに変更
- cssによるビジュアルの変更が可能
- optionでは
  * アニメーションを選択可能
  * chageでの送信対応

## How to Use
    $('.style-select').styleSelect({
        // click or mouseover
        mouseEventType : 'click',

        // fade or slide
        animationType : 'fade',

        // アニメーション速度
        animationDuration : 200,

        // onChange での送信設定
        changeSubmit : false
    });

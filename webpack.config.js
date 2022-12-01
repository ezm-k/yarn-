const PATH = require('path');//pathモジュールを呼び出し
const JS_PATH = PATH.join(__dirname, './src/js');
const JS_DIST_PATH = PATH.join(__dirname, './');
const MODE = "development";//モードの選択；'production' or 'development'

module.exports = [
  {
    //モードの設定
    mode: MODE,
    //エントリーポイントの設定（バンドルの起点となる）
    //src/js/util/Main.jsをエントリーポイントとし、名前を「bundle」とする
    entry: {
      'dist/common/js/bundle': JS_PATH + '/Main.js'
    },
    //ファイルの出力設定
    output: {
      //出力先のパス（なければdist/main.js）
      path: JS_DIST_PATH,
      //出力するファイル名
      //現在はbundle.jsと設定
      //[name]にはentryでオブジェクト指示したキーが入る。
      filename: '[name].js'
    },

    //???
    resolve: {
      //エントリーファイルの拡張子を指定（他の拡張子をエントリーファイルにする際、適宜追加）
      //配列の最初の拡張子のファイルから処理する
      extensions: ['.js'],
      modules: [JS_PATH, 'node_modules']
    },
    //各種モジュールの設定
    module: {
      rules: [
        {
          //管理対象ファイル
          //.jsが末尾のファイルのみが該当
          test: /\.js$/,
          //処理対象から外すファイル
          exclude: /node_modules/,
          //どのローダーを使うのか
          use: [
            {
              //利用するローダー
              loader: 'babel-loader',
              options: {
                //babel用の設定。（ES5以前のコードへ変換）
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      modules: false
                    }
                  ]
                ]
              }
            }
          ],
        }
      ]
    }
  },
];
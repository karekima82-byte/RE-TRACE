RE:TRACE 第1章導入

対象リポジトリ: karekima82-byte/RE-TRACE

今回のファイル:
- chapter1.js

内容:
- RE_TRACE_第1章_改訂4(1).md の第1章本文をプレイ用データ化
- 第1章の見出し・ナレーション・台詞を順番どおり収録
- タイトル画面「はじめから」から第1章を開始
- 既存の短い居酒屋デモを第1章プレイに置換
- 既存の9:16 UIを使用
- 画像素材がまだ無い場面は現在の背景を仮使用

導入:
index.html の game.js の直後に以下を1行追加してください。
<script src="chapter1.js"></script>

例:
<script src="game.js"></script>
<script src="chapter1.js"></script>

assets/bg、assets/characters 等の新規素材はまだ追加していません。
ユーザー側で素材をアップロード後、chapter1.js 側の背景・立ち絵切替を追加する前提です。

注意:
現在のGitHub連携は読み取りはできていますが、こちらからGitHubへの書き込みは403で拒否されたため、直接コミットはしていません。

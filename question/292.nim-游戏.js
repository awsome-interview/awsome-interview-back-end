/*
 * @lc app=leetcode.cn id=292 lang=javascript
 *
 * [292] Nim 游戏
 */
// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var canWinNim = function (n) {
    // 去掉4的倍数
    return n % 4 !== 0
};

// 如果堆中石头的数量 nn 不能被 44 整除，那么你总是可以赢得 Nim 游戏的胜利。

// 推理

// 让我们考虑一些小例子。显而易见的是，如果石头堆中只有一块、两块、或是三块石头，那么在你的回合，你就可以把全部石子拿走，从而在游戏中取胜。而如果就像题目描述那样，堆中恰好有四块石头，你就会失败。因为在这种情况下不管你取走多少石头，总会为你的对手留下几块，使得他可以在游戏中打败你。因此，要想获胜，在你的回合中，必须避免石头堆中的石子数为 4 的情况。

// 同样地，如果有五块、六块、或是七块石头，你可以控制自己拿取的石头数，总是恰好给你的对手留下四块石头，使他输掉这场比赛。但是如果石头堆里有八块石头，你就不可避免地会输掉，因为不管你从一堆石头中挑出一块、两块还是三块，你的对手都可以选择三块、两块或一块，以确保在再一次轮到你的时候，你会面对四块石头。

// 显然，它以相同的模式不断重复 n=4,8,12,16,\dotsn=4,8,12,16,…，基本可以看出是 44 的倍数。

// 作者：LeetCode
// 链接：https://leetcode-cn.com/problems/nim-game/solution/nimyou-xi-by-leetcode/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
// @lc code=end
console.log(canWinNim(1))
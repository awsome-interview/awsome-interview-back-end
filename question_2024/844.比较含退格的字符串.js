/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
// 思路解析：

// 准备两个指针 iii, jjj 分别指向 SSS，TTT 的末位字符，再准备两个变量 skipSskipSskipS，skipTskipTskipT 来分别存放 SSS，TTT 字符串中的 #\## 数量。
// 从后往前遍历 SSS，所遇情况有三，如下所示：
// 2.1 若当前字符是 #\##，则 skipSskipSskipS 自增 111；
// 2.2 若当前字符不是 #\##，且 skipSskipSskipS 不为 000，则 skipSskipSskipS 自减 111；
// 2.3 若当前字符不是 #\##，且 skipSskipSskipS 为 000，则代表当前字符不会被消除，我们可以用来和 TTT 中的当前字符作比较。
// 若对比过程出现 SSS, TTT 当前字符不匹配，则遍历结束，返回 falsefalsefalse，若 SSS，TTT 都遍历结束，且都能一一匹配，则返回 truetruetrue。

// 作者：御三五 🥇
// 链接：https://leetcode.cn/problems/backspace-string-compare/solutions/683776/shuang-zhi-zhen-bi-jiao-han-tui-ge-de-zi-8fn8/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
var backspaceCompare = function (s, t) {
    // 双指针法
    let i = s.length - 1, j = t.length - 1, skipS = 0, skipT = 0
    while (i >= 0 || j >= 0) {
        while (i >= 0) {
            if (s[i] === '#') {
                skipS++
                i--
            } else if (skipS > 0) {
                skipS--
                i--
            } else {
                break
            }
        }
        while (j >= 0) {
            if (t[j] === '#') {
                skipT++
                j--
            } else if (skipT > 0) {
                skipT--
                j--
            } else {
                break
            }
        }
        if (s[i] !== t[j]) return false
        i--
        j--
    }
    return true
};
// @lc code=end
// console.log(backspaceCompare("ab###c", "ad#c"))
// console.log(backspaceCompare("a#c", "b"))
console.log(backspaceCompare("xywrrmp", "xywrrmu#p"))
// console.log(backspaceCompare("ab#c", "ad#c"))

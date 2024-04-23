/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
    // 二分法
    let left = 0, right = x, mid
    while (left <= right) {
        mid = Math.floor((left + right) / 2)
        if (mid * mid > x) {
            right = mid - 1
        } else if (mid * mid < x) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return right
};
// @lc code=end

// console.log(mySqrt(4))
console.log(mySqrt(8))
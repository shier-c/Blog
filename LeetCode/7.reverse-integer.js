/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 23:22:35
 * @LastEditTime: 2019-08-15 22:18:35
 * @LastEditors: Please set LastEditors
 */
/*
 * @lc app=leetcode id=7 lang=javascript
 *
 * [7] Reverse Integer
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  let flag = x > 0 ? true : false;
  x = Math.abs(x) + '';
  x = x.split('');
  x = x.reverse();
  x = x.join('');
  x = parseInt(x);
  x = flag ? x : parseInt('-' + x);
  if ((x > Math.pow(2, 31) - 1) || x < Math.pow(-2, 31)) return 0;
  return x;
};


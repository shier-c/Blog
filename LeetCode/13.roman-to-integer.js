/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 22:46:38
 * @LastEditTime: 2019-08-15 23:46:18
 * @LastEditors: Please set LastEditors
 */
/*
 * @lc app=leetcode id=13 lang=javascript
 *
 * [13] Roman to Integer
 */
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
  let count = 0;
  let romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900
  }
  for(let i = 0; i < s.length; i++) {
    let key = s[i]
    if(i < s.length - 1){
      key = s[i] + s[i + 1]
      if(romanMap.hasOwnProperty(key)){
        i += 1
      }else{
        key = s[i]
      }
    }
      count += romanMap[key]
  }
  return count
};


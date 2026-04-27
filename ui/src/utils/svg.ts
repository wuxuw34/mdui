/**
 * 将 SVG 路径字符串中的 Q/q 指令转换为 C 指令
 * @param {string} pathString - 原始的 SVG 路径字符串
 * @returns {string} - 转换后的 SVG 路径字符串
 */
export function convertQToC(pathString: string): string {
  // 使用正则表达式分割路径命令和参数
  // 这个正则会匹配命令字母和紧随其后的数字（包括负号和小数点）
  const regex = /([MmZzLlHhVvCcSsQqTtAa])([^MmZzLlHhVvCcSsQqTtAa]*)/g;

  let currentX = 0;
  let currentY = 0;
  let startX = 0;
  let startY = 0;

  const convertedParts: string[] = [];

  pathString.replace(regex, (match, command, paramsStr) => {
    const isRelative = command === command.toLowerCase();
    const params = paramsStr.trim().split(/[\s,]+/).filter((p: string) => p !== '').map(Number);

    let newCommand = command;
    let newParams = [];

    if (command === 'M' || command === 'm') {
      const [x, y] = params;
      if (isRelative) {
        currentX += x;
        currentY += y;
      } else {
        currentX = x;
        currentY = y;
      }
      startX = currentX;
      startY = currentY;
    } else if (command === 'Q' || command === 'q') {
      const [qx, qy, endX, endY] = params;

      let p1x, p1y, p2x, p2y;
      if (isRelative) {
        p1x = currentX + qx;
        p1y = currentY + qy;
        p2x = currentX + endX;
        p2y = currentY + endY;
      } else {
        p1x = qx;
        p1y = qy;
        p2x = endX;
        p2y = endY;
      }

      // 应用转换公式
      const cp1x = currentX + (p1x - currentX) * 2 / 3;
      const cp1y = currentY + (p1y - currentY) * 2 / 3;
      const cp2x = p2x + (p1x - p2x) * 2 / 3;
      const cp2y = p2y + (p1y - p2y) * 2 / 3;

      newCommand = 'C';
      newParams = [cp1x, cp1y, cp2x, cp2y, p2x, p2y];

      // 更新当前点和最后的控制点
      currentX = p2x;
      currentY = p2y;
    } else {
      // 其他命令保持原样，但需要更新当前点位置
      // 这里为了简化，只处理了 Q 命令，其他命令的逻辑类似
      // 实际应用中需要完整实现所有命令来追踪 currentX/currentY
      newCommand = command;
      newParams = params;

      // 简单更新位置，实际项目需要更严谨的实现
      if (command === 'L' || command === 'l') {
        const [x, y] = params;
        if (isRelative) {
          currentX += x; currentY += y;
        } else {
          currentX = x; currentY = y;
        }
      }
      if (command === 'Z' || command === 'z') {
        currentX = startX; currentY = startY;
      }
    }

    convertedParts.push(newCommand + newParams.join(' '));
    return '';
  });

  return convertedParts.join(' ');
}


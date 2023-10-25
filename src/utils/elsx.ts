import { useDateFormat } from '@vueuse/core'
import { utils, writeFile } from 'xlsx'

/**
 * 导出excel
 * @param data 对象数据
 * @param fields 字段数据
 * @param titles 标题
 * @param opt 其他
 */
export function exportExcel<T>(
  data: T[] & object[],
  fields: string[],
  titles: object | Partial<T>,
  opt?: { filename?: string; workbook?: string },
) {
  // 1. 生成工作簿
  const workbook = utils.book_new()

  // 2. 生成一个工作表，把数组转换为工作表
  const ws = createWs(data, fields, titles)

  // 3.在工作簿中添加工作表
  utils.book_append_sheet(workbook, ws, opt?.workbook || '列表-1') // 工作簿名称
  const option = {
    cellStyles: false,
  }
  // 4.输出工作表,由文件名决定的输出格式
  const fileName = opt?.filename || `列表-${useDateFormat(new Date(), 'yyyy-MM-dd').value}.xlsx`
  writeFile(workbook, fileName, option) // 保存的文件名
  ElNotification.success({
    title: '导出成功！',
    message: `文件：${fileName}`,
  })
}

// 创建一个worksheet,创建过程中设置表头
function createWs(data: object[], fields: string[], titles: any) {
  const ws = utils.json_to_sheet(data, {
    header: fields,
  })
  const range = utils.decode_range(ws['!ref'] || '')
  for (let c = range.s.c; c <= range.e.c; c++) {
    const header = `${utils.encode_col(c)}1`
    ws[header].v = titles[ws[header].v]
  }
  return ws
}

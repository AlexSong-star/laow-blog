/**
 * 敏感词过滤器
 * 包含：黄赌毒、政治、暴力等违规内容
 */

// 敏感词列表（俄语为主，中英为辅）
const SENSITIVE_PATTERNS: [RegExp, string][] = [
  // 赌博
  [/\bказино\b/i, 'казино'],
  [/\bгемблинг\b/i, 'гемблинг'],
  [/\bбукмекер/i, 'букмекер'],
  [/\bставки\s*(на\s*спорт|спортивн)/i, 'ставки на спорт'],
  [/\bпокер\b/i, 'покер'],
  [/\bлотере/i, 'лотерея'],
  [/\bазартн/i, 'азартные игры'],

  // 色情
  [/\bпорно/i, 'порно'],
  [/\bxxx\b/i, 'xxx'],
  [/\bсекс\s*(с\s*\d|знакомств|услуг)/i, 'секс услуги'],
  [/\bинтим/i, 'интим услуги'],
  [/\bэротик/i, 'эротика'],

  // 暴力/武器
  [/\bоружи/i, 'оружие'],
  [/\bпистолет/i, 'пистолет'],
  [/\bвинтовк/i, 'винтовка'],
  [/\bвзрывчатк/i, 'взрывчатка'],
  [/\bтеррорист/i, 'терроризм'],
  [/\bэкстремист/i, 'экстремизм'],

  // 政治敏感（泛化版）
  [/\b(?:политическ|власть|правительств)\s*(репресси|преследова|арестов)/i, 'политические репрессии'],
  [/\bдискриминац/i, 'дискриминация'],
  [/\bрасист/i, 'расизм'],
  [/\bфашист/i, 'фашизм'],
  [/\bнацист/i, 'нацизм'],
  [/\bсепаратист/i, 'сепаратизм'],

  // 毒品
  [/\bнаркотик/i, 'наркотики'],
  [/\bкокаин/i, 'кокаин'],
  [/\bгероин/i, 'героин'],
  [/\bмарихуан/i, 'марихуана'],
  [/\bамфетамин/i, 'амфетамин'],
  [/\bспайс/i, 'спайс'],

  // 欺诈
  [/\bмошенничеств/i, 'мошенничество'],
  [/\bскам/i, 'скам'],
  [/\bфишинг/i, 'фишинг'],
  [/\bпирамид[а-я]*/i, 'финансовая пирамида'],
]

export interface FilterResult {
  passed: boolean
  reason?: string
  matched_word?: string
}

export function checkSensitive(content: string): FilterResult {
  for (const [pattern, label] of SENSITIVE_PATTERNS) {
    if (pattern.test(content)) {
      return { passed: false, reason: `内容包含敏感词: ${label}`, matched_word: label }
    }
  }
  return { passed: true }
}

export function filterComment(authorName: string, content: string): FilterResult {
  // 同时检查昵称和内容
  const nameResult = checkSensitive(authorName)
  if (!nameResult.passed) return nameResult
  
  return checkSensitive(content)
}

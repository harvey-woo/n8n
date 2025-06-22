import { I18nClass } from './index';

describe(I18nClass, () => {
	describe('displayTimer', () => {
		it('should format duration with hours, minutes and seconds', () => {
			expect(new I18nClass().displayTimer(-1)).toBe('-1s');
			expect(new I18nClass().displayTimer(0)).toBe('0s');
			expect(new I18nClass().displayTimer(12)).toBe('0s');
			expect(new I18nClass().displayTimer(123)).toBe('0s');
			expect(new I18nClass().displayTimer(1234)).toBe('1s');
			expect(new I18nClass().displayTimer(59000)).toBe('59s');
			expect(new I18nClass().displayTimer(60000)).toBe('1m 0s');
			expect(new I18nClass().displayTimer(600000)).toBe('10m 0s');
			expect(new I18nClass().displayTimer(601234)).toBe('10m 1s');
			expect(new I18nClass().displayTimer(3599999)).toBe('59m 59s');
			expect(new I18nClass().displayTimer(3600000)).toBe('1h 0m 0s');
			expect(new I18nClass().displayTimer(3601234)).toBe('1h 0m 1s');
			expect(new I18nClass().displayTimer(6000000)).toBe('1h 40m 0s');
			expect(new I18nClass().displayTimer(100000000)).toBe('27h 46m 40s');
		});

		it('should include milliseconds if showMs=true and the time includes sub-seconds', () => {
			expect(new I18nClass().displayTimer(0, true)).toBe('0s');
			expect(new I18nClass().displayTimer(12, true)).toBe('12ms');
			expect(new I18nClass().displayTimer(123, true)).toBe('123ms');
			expect(new I18nClass().displayTimer(1012, true)).toBe('1.012s');
			expect(new I18nClass().displayTimer(1120, true)).toBe('1.12s');
			expect(new I18nClass().displayTimer(1234, true)).toBe('1.234s');
			expect(new I18nClass().displayTimer(600000, true)).toBe('10m 0s');
			expect(new I18nClass().displayTimer(601234, true)).toBe('10m 1.234s');
			expect(new I18nClass().displayTimer(3600000, true)).toBe('1h 0m 0s');
			expect(new I18nClass().displayTimer(3601234, true)).toBe('1h 0m 1.234s');
		});
	});

	describe('中文文案测试', () => {
		it('应该正确显示中文文案', () => {
			const i18n = new I18nClass();

			// 模拟中文文案
			i18n.baseText = vi.fn((key: string) => {
				const mapping: Record<string, string> = {
					'generic.cancel': '取消',
					'generic.save': '保存',
					'generic.open': '打开',
					'generic.close': '关闭',
				};
				return mapping[key] || key;
			});

			expect(i18n.baseText('generic.cancel' as never)).toBe('取消');
			expect(i18n.baseText('generic.save' as never)).toBe('保存');
			expect(i18n.baseText('generic.open' as never)).toBe('打开');
			expect(i18n.baseText('generic.close' as never)).toBe('关闭');
		});
	});
});

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.app.json',
			},
		],
	},
	moduleNameMapper: {
		'\\.(css|less|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
	},
};

export enum Emoji {
	THUMBSUP = 'thumbsUp',
	THUMBSDOWN = 'thumbsDown',
	HEART = 'heart',
	LAUGHING = 'laughing',
	CONGRATULATIONS = 'congratulations',
	SWAG = 'swag'
}

export const Emojis: { [key in Emoji]: string } = {
	[Emoji.THUMBSUP]: '👍',
	[Emoji.THUMBSDOWN]: '👎',
	[Emoji.HEART]: '❤️',
	[Emoji.LAUGHING]: '😂',
	[Emoji.CONGRATULATIONS]: '🎉',
	[Emoji.SWAG]: '😎'
};

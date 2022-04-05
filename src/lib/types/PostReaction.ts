import type { Emoji } from './Emoji';

type ReactionValue = string[];

export interface PostReaction {
	[Emoji.THUMBSUP]: ReactionValue;
	[Emoji.THUMBSDOWN]: ReactionValue;
	[Emoji.HEART]: ReactionValue;
	[Emoji.LAUGHING]: ReactionValue;
	[Emoji.CONGRATULATIONS]: ReactionValue;
	[Emoji.SWAG]: ReactionValue;
}

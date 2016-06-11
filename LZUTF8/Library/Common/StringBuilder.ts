﻿namespace LZUTF8
{
	export class StringBuilder
	{
		private outputBuffer: number[] = new Array(1024);
		private outputPosition = 0;
		private outputString = "";

		append(charCode: number)
		{
			this.outputBuffer[this.outputPosition++] = charCode;

			if (this.outputPosition === 1024)
				this.flushBufferToOutputString();
		}

		appendCodePoint(codePoint: number)
		{
			if (codePoint <= 0xFFFF)
			{
				this.append(codePoint);
			}
			else if (codePoint <= 0x10FFFF)
			{
				this.append(0xD800 + ((codePoint - 0x10000) >>> 10));
				this.append(0xDC00 + ((codePoint - 0x10000) & 1023));
			}
			else
				throw new RangeError("StringBuilder.appendCodePoint: A code point of " + codePoint + " cannot be encoded in UTF-16");
		}

		toString(): string
		{
			this.flushBufferToOutputString();
			return this.outputString;
		}

		private flushBufferToOutputString()
		{
			if (this.outputPosition === 1024)
				this.outputString += String.fromCharCode.apply(null, this.outputBuffer);
			else
				this.outputString += String.fromCharCode.apply(null, this.outputBuffer.slice(0, this.outputPosition));

			this.outputPosition = 0;
		}
	}
} 
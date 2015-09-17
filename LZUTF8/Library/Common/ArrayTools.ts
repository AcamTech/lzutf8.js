﻿module LZUTF8
{
	export class ArrayTools
	{
		static copyElements(source: IndexableCollection<any>, sourceIndex: number, destination: IndexableCollection<any>, destinationIndex: number, count: number)
		{
			while (count--)
				destination[destinationIndex++] = source[sourceIndex++];
		}

		static zeroElements(collection: IndexableCollection<any>, index: number, count: number)
		{
			while (count--)
				collection[index++] = 0;
		}

		static find(collection: IndexableCollection<any>, itemToFind: any): number
		{
			for (var i = 0; i < collection.length; i++)
				if (collection[i] === itemToFind)
					return i;

			return -1;
		}

		static compareSequences(sequence1: IndexableCollection<any>, sequence2: IndexableCollection<any>): boolean
		{
			var lengthMatched = true;
			var elementsMatched = true;

			if (sequence1.length !== sequence2.length)
			{
				console.log("Sequence length did not match: sequence 1 length is " + sequence1.length + ", sequence 2 length is " + sequence2.length);
				lengthMatched = false;
			}

			for (var i = 0; i < Math.min(sequence1.length, sequence2.length); i++)
				if (sequence1[i] !== sequence2[i])
				{
					console.log("Sequence elements did not match: sequence1[" + i + "] === " + sequence1[i] + ", sequence2[" + i + "] === " + sequence2[i]);
					elementsMatched = false;
					break;
				}

			return lengthMatched && elementsMatched;
		}

		static countNonzeroValuesInArray(array: IndexableCollection<any>): number
		{
			var result = 0;

			for (var i = 0; i < array.length; i++)
				if (array[i])
					result++;

			return result;
		}

		static truncateStartingElements(array: Array<any>, truncatedLength: number)
		{
			if (array.length <= truncatedLength)
				throw new RangeError("truncateStartingElements: Requested length should be smaller than array length");

			var sourcePosition = array.length - truncatedLength;

			for (var i = 0; i < truncatedLength; i++)
				array[i] = array[sourcePosition + i];

			array.length = truncatedLength;
		}

		static doubleByteArrayCapacity(array: Uint8Array): Uint8Array
		{
			var newArray = new Uint8Array(array.length * 2);
			newArray.set(array);

			return newArray;
		}

		static joinByteArrays(byteArrays: Uint8Array[])
		{
			var totalLength = 0;

			for (var i = 0; i < byteArrays.length; i++)
			{
				totalLength += byteArrays[i].length;
			}

			var result = new Uint8Array(totalLength);
			var currentOffset = 0;

			for (var i = 0; i < byteArrays.length; i++)
			{
				result.set(byteArrays[i], currentOffset);
				currentOffset += byteArrays[i].length;
			}

			return result;
		}

		static splitByteArray(byteArray: Uint8Array, maxPartLength: number): Uint8Array[]
		{
			var result: Uint8Array[] = [];

			for (var offset = 0; offset < byteArray.length; )
			{
				var blockLength = Math.min(maxPartLength, byteArray.length - offset);
				result.push(byteArray.subarray(offset, offset + blockLength));

				offset += blockLength;
			}

			return result;
		}

		static convertToUint8ArrayIfNeeded(input: any): any
		{
			if (Array.isArray(input) || (typeof Buffer === "function" && input instanceof Buffer))
				return new Uint8Array(input);
			else
				return input;
		}
	}
} 
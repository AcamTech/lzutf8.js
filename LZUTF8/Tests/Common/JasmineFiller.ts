﻿module LZUTF8
{
	if (typeof describe !== "function")
	{
		var globalObject: any;
		if (runningInNodeJS())
			globalObject = global;
		else if (typeof window != "object")
			globalObject = self;
		else
			globalObject = window;

		globalObject["describe"] = () => { };
	}
}
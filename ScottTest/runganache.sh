#!/bin/bash

ganache-cli \
	-p 9945 \
	-i 1357 \
	--account="0xd14ee65a3fd524b233b6e9db4a88d500fada242049ce843bff1797ce8a71b0c6,10000000000000000000000000" \
	--account="0x4061303563b1a881a97140e006bc82f1186ed4a5383aa46264fbe8bb6b2b7dd4,10000000000000000000000000" \
	--account="0x362158e6d4516bbd38bc47952b5b181756cbdec13b173ad8ef63f20fdbc03627,10000000000000000000000000" \
	--account="0x81b46bc763d989628e64b65a99f267d0ae9aa15a6f583dc695be7130a369f267,10000000000000000000000000" 


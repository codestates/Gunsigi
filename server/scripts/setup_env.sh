#!/bin/bash
# aws cli 통해서 환경변수 받고 python으로 파싱해서 환경변수 파일 생성
echo 'Production모드로 실행합니다. 로컬에서 개발이나 테스트 중 일 경우 "npm run dev"로 실행해주세요'
aws ssm get-parameters-by-path --path /Gunsigi --query Parameters | \
python3 -c '
import json, sys
print("\n".join([param["Name"].rsplit("/", 1)[-1]+"="+param["Value"] for param in json.load(sys.stdin)]))
' > .env.production
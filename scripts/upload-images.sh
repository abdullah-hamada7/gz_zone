#!/bin/bash
set -e

SUPABASE_URL="https://cjfkxwgijyznrxvlgfsy.supabase.co"
SERVICE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZmt4d2dpanl6bnJ4dmxnZnN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk5NTI5NiwiZXhwIjoyMTAwNTcxMjk2fQ.vrq4HiSw-CZLaLZIPwwz7VEa4TMUmg6mxAQO0dnsPsA"
STORAGE_URL="$SUPABASE_URL/storage/v1/object/gallery"
API_URL="$SUPABASE_URL/rest/v1/gallery_images"

declare -A ALT_MAP
ALT_MAP["hero-lcp.jpg"]="GZ'ZONE mobile massage setup delivered to your location in Porto"
ALT_MAP["aromatherapy-massage.jpg"]="Aromatherapy massage treatment"
ALT_MAP["caption.jpg"]="Gz Zone massage session"
ALT_MAP["cupping-therapy-hijama.jpg"]="Cupping therapy session"
ALT_MAP["cupping-therapy-hijama (1).jpg"]="Cupping therapy treatment"
ALT_MAP["cupping-therapy-hijama (2).jpg"]="Cupping therapy application"
ALT_MAP["cupping-therapy-hijama (3).jpg"]="Dry cupping therapy"
ALT_MAP["deep-tissue-massage.jpg"]="Deep tissue massage therapy"
ALT_MAP["essential-oils.jpg"]="Essential oils for massage"
ALT_MAP["essential-oils (1).jpg"]="Aromatherapy essential oils"
ALT_MAP["essential-oils (2).jpg"]="Therapeutic essential oils"
ALT_MAP["gz-zone-massage-cupping.jpg"]="Massage and cupping combination therapy"
ALT_MAP["gz-zone-massage-cupping (1).jpg"]="Massage cupping therapy session"
ALT_MAP["gz-zone-massage-cupping (2).jpg"]="Therapeutic cupping massage"
ALT_MAP["gz-zone-massage-cupping (3).jpg"]="Cupping massage treatment"
ALT_MAP["gz-zone-massage-cupping (4).jpg"]="Massage therapy with cupping"
ALT_MAP["gz-zone-massage-cupping (5).jpg"]="Professional cupping massage"
ALT_MAP["gz-zone-massage-cupping (6).jpg"]="Deep tissue cupping therapy"
ALT_MAP["gz-zone-massage-cupping (7).jpg"]="Full body cupping massage"
ALT_MAP["k6qFHE9onOx2dEvKWmPALwN3vZmI2Vu0.jpeg"]="Massage treatment session"
ALT_MAP["KT90eNJhhFbuPBwtpTdqxM52GeKdkWP7.jpeg"]="Professional massage therapy"
ALT_MAP["MBPcXB9oIEHuzl78FFmD0JxeEzOeVj5W.jpeg"]="Relaxing massage session"
ALT_MAP["omar-elgazzar.jpg"]="Omar Elgazzar massage therapist"
ALT_MAP["swedish-massage.jpg"]="Relaxing Swedish massage"
ALT_MAP["trigger-points-massage.jpg"]="Trigger points massage therapy"
ALT_MAP["trigger-points-massage (1).jpg"]="Trigger point release therapy"
ALT_MAP["certs.jpg"]="Professional certifications and credentials"
ALT_MAP["chatgpt_image_may_22_2026_at_08_16_19_pm.jpg"]="Massage therapy session"
ALT_MAP["img_0344.jpg"]="Relaxing massage treatment"
ALT_MAP["img_8888.jpg"]="Massage therapy setup"
ALT_MAP["photo20260427212031.jpg"]="Professional massage session in Porto"
ALT_MAP["untitled_design.jpg"]="Gz Zone massage experience"
ALT_MAP["what_is_gzzone_1.jpg"]="Professional mobile massage setup in Porto"

cd "$(dirname "$0")/../public/images"

# Get already-uploaded files
EXISTING=$(curl -s -X POST "$SUPABASE_URL/storage/v1/object/list/gallery" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prefix":"","limit":100,"offset":0}' | python3 -c "
import sys, json
data = json.load(sys.stdin)
if isinstance(data, list):
    for d in data:
        print(d['name'])
")

SORT=0
for FILE in *; do
  [ -f "$FILE" ] || continue
  ALT="${ALT_MAP[$FILE]}"
  [ -z "$ALT" ] && continue

  # Skip if already uploaded
  if echo "$EXISTING" | grep -Fxq "$FILE"; then
    SORT=$((SORT + 1))
    continue
  fi

  echo "Uploading: $FILE"

  case "${FILE,,}" in
    *.jpg|*.jpeg) CT="image/jpeg" ;;
    *.png) CT="image/png" ;;
    *.webp) CT="image/webp" ;;
    *) CT="application/octet-stream" ;;
  esac

  # URL-encode filename for the API
  ENCODED=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$FILE'))")

  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$STORAGE_URL/$ENCODED" \
    -H "Authorization: Bearer $SERVICE_KEY" \
    -H "Content-Type: $CT" \
    --data-binary "@$FILE")

  if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "201" ]; then
    echo "  Upload failed (HTTP $HTTP_CODE)"
    SORT=$((SORT + 1))
    continue
  fi

  PUBLIC_URL="$SUPABASE_URL/storage/v1/object/public/gallery/$ENCODED"

  curl -s -X POST "$API_URL" \
    -H "Authorization: Bearer $SERVICE_KEY" \
    -H "Content-Type: application/json" \
    -H "Prefer: return=minimal" \
    -d "{\"public_url\":\"$PUBLIC_URL\",\"alt_text\":\"$ALT\",\"title\":null,\"sort_order\":$SORT}" > /dev/null

  echo "  -> Done"
  SORT=$((SORT + 1))
done

echo ""
echo "Total: $SORT images"

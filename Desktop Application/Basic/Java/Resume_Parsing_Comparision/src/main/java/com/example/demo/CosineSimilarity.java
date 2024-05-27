package com.example.demo;

import java.util.HashMap;
import java.util.Map;

public class CosineSimilarity {
    static double compare(String text1,String text2) {

        Map<String, Integer> profile1 = getProfile(text1);
        Map<String, Integer> profile2 = getProfile(text2);

        double similarity = cosineSimilarity(profile1, profile2);
        System.out.println("Similarity: " + similarity * 200);
        return similarity;
    }

    public static Map<String, Integer> getProfile(String text) {
        Map<String, Integer> profile = new HashMap<>();
        String[] words = text.split("\\s+");

        for (String word : words) {
            if (profile.containsKey(word)) {
                profile.put(word, profile.get(word) + 1);
            } else {
                profile.put(word, 1);
            }
        }

        return profile;
    }

    public static double cosineSimilarity(Map<String, Integer> profile1, Map<String, Integer> profile2) {
        double dotProduct = 0;
        double magnitude1 = 0;
        double magnitude2 = 0;

        for (Map.Entry<String, Integer> entry : profile1.entrySet()) {
            if (profile2.containsKey(entry.getKey())) {
                dotProduct += entry.getValue() * profile2.get(entry.getKey());
            }
            magnitude1 += Math.pow(entry.getValue(), 2);
        }

        for (Map.Entry<String, Integer> entry : profile2.entrySet()) {
            magnitude2 += Math.pow(entry.getValue(), 2);
        }

        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);

        return dotProduct / (magnitude1 * magnitude2);
    }
}